var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger');
var router = express.Router();

/* GET taxies listing. */
router.get('/', function(req, res, next) {
 	res.sendFile(path.join(__dirname, '../public', 'taxis.html'));
});


// GET name list
router.get('/getnames', function(req, res) {

	fs.readFile('public/files/TaxiNameList.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success', namelist:data});
			logger.debug('TAXI: Name list req recieved, res sent.');
		}
	});

});

// POST name status
router.post('/sendstatus', function(req, res) {
 	
	var name = req.body.name;
	var status = req.body.status;

	fs.readFile('public/files/TaxiNameList.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {

			var namelist =  data.split('\n');

			namelist.forEach((element, index) => {
				if ((element.slice(0, -1) == name) && (status == 0)) {
					element = element.slice(0, -1);
					namelist[index] = element + "1";
					logger.info('Status of ' + name + ' has been updated to ' + '1.');
				} else if ((element.slice(0, -1) == name) && (status == 1)) {
					element = element.slice(0, -1);
					namelist[index] = element + "2";
					logger.info('Status of ' + name + ' has been updated to ' + '2.');
				}  else if ((element.slice(0, -1) == name) && (status == 2)) {
					element = element.slice(0, -1);
					namelist[index] = element + "0";
					logger.info('Status of ' + name + ' has been updated to ' + '0.');
				} else if ((element == name) && (status == 3)) {
					namelist[index] = element + "0";
					logger.info(name + ' has been given status ' + '0.');
				}
			});
			
			var updatednamelist = namelist.join('\n');
			
			fs.writeFile('public/files/TaxiNameList.txt', updatednamelist, function (err) {
				if (err) {
					throw err;
					res.json({msg:'error'});
				} else {
					res.json({msg:'success'});
					logger.info('Successfully wrote student statuses to file.');
				}
			});
			
		}

	});

});

module.exports = router;

var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger');
var router = express.Router();

/* GET buses page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'buses.html'));
});

// GET bus statuses.
router.get('/getbuses', function (req, res) {
	
	fs.readFile('public/files/BusList.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success', buses:data});
			logger.debug('BUS: Bus statuses req recieved, res sent.');
		}
	});

});

// POST bus status
router.post('/sendstatus', function(req, res) {
	
	var busId = req.body.busId;
	var status = req.body.status;

	fs.readFile('public/files/BusList.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {

			var buses =  data.split('/');

			buses.forEach((element, index) => {
				if ((element.slice(0, -1) == busId) && (status == 1)) {
					element = element.slice(0, -1);
					buses[index] = element + "2";
					logger.info('Status of bus #' + busId.toString() + ' has been updated to 2.');
				} else if ((element.slice(0, -1) == busId) && (status == 2)) {
					element = element.slice(0, -1);
					buses[index] = element + "3";
					logger.info('Status of bus #' + busId.toString() + ' has been updated to 3.');
				} else if ((element.slice(0, -1) == busId) && (status == 3)) {
					element = element.slice(0, -1);
					buses[index] = element + "1";
					logger.info('Status of bus #' + busId.toString() + ' has been updated to 1.');
				}
			});
			
			var updatedbuses = buses.join('/');
			
			fs.writeFile('public/files/BusList.txt', updatedbuses, function (err) {
				if (err) {
					throw err;
					res.json({msg:'error'});
				} else {
					res.json({msg:'success'});
					logger.info('Successfully wrote bus statuses to file.');
				}
			});
			
		}

	});

});

module.exports = router;

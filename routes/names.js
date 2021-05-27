var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger');
var router = express.Router();

/* GET taxies listing. */
router.get('/', function(req, res, next) {
 	res.sendFile(path.join(__dirname, '../public', 'names.html'));
});

// POST name list
router.post('/sendnames', function(req, res) {

 	fs.writeFile('public/files/TaxiNameList.txt', req.body.namelist, function (err) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success'});
			logger.info('Taxi names have been updated.');
		}
	});

});

// GET name list
router.get('/getnames', function(req, res) {

	fs.readFile('public/files/TaxiNameList.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success', namelist:data});
			logger.debug('NAMES: Name list req recieved, res sent.');
		}
	});

});


module.exports = router;

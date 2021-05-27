var express = require('express');
var fs = require('fs');
var logger = require('../utils/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET name list
router.get('/getnames', function(req, res) {

	fs.readFile('public/files/TaxiNameList.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success', namelist:data});
			logger.debug('TD: Namelist req recieved, res sent.');
		}
	});

});

// GET announcements
router.get('/getannouncements', function(req, res) {

	fs.readFile('public/files/Announcements.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success', announcements:data});
			logger.debug('TD: Announcements req recieved, res sent.');
		}
	});

});

// GET bus statuses.
router.get('/getbuses', function (req, res) {
	
	fs.readFile('public/files/BusList.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success', buses:data});
			logger.debug('TD: Bus statuses req recieved, res sent.');
		}
	});

});

module.exports = router;

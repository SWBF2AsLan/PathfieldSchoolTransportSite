var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger');
var router = express.Router();

/* GET announcements listing. */
router.get('/', function(req, res, next) {
 	res.sendFile(path.join(__dirname, '../public', 'announcements.html'));
});

// POST announcements
router.post('/sendannouncements', function(req, res) {

 	fs.writeFile('public/files/Announcements.txt', req.body.text, function (err) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success'});
			logger.info('Announcements have been updated.');
		}
	});

});

// GET announcements.
router.get('/getannouncements', function(req, res) {

	fs.readFile('public/files/Announcements.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
			res.json({msg:'error'});
		} else {
			res.json({msg:'success', announcements:data});
			logger.debug('ANN: Announcements req recieved, res sent.');
		}
	});

});


module.exports = router;

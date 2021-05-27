var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var fs = require('fs');
var compression = require('compression');
var helmet = require('helmet');
var logger = require('./utils/logger');

//routes
var indexRouter = require('./routes/index');
var busesRouter = require('./routes/buses');
var taxisRouter = require('./routes/taxis');
var namesRouter = require('./routes/names');
var announcementsRouter = require('./routes/announcements');

//init app
var app = express();

//logging stuff
logger.stream = {
    write: function(message, encoding){
        logger.http(message);
    }
};

app.use(morgan("combined", { "stream": logger.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				"default-src": ["'self'"],
      				"script-src": ["'self'", "'unsafe-inline'", "ajax.googleapis.com"],
				"style-src": ["'self'", "'unsafe-inline'"],
      			},
		},
	})
);

app.use(compression());

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/buses', busesRouter);
app.use('/taxis', taxisRouter);
app.use('/names', namesRouter);
app.use('/announcements', announcementsRouter);

// Capture 500 errors
app.use((err,req,res,next) => {
res.status(500).send('Could not perform the calculation!');
   logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

//Create files folder.
var dir = './public/files';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
	logger.info('Public/files folder created.');
} else {
	logger.info('Public/files folder already exists.');
}

//Create bus file if it doesn't already exist.
var busdata = "011/021/031/041/051/061/071/081/091/101/111/121/131/141/151/161/171/181/191/201";
fs.writeFile('public/files/BusList.txt', busdata, { flag: 'wx' }, function(err, data) {
	if ((err) && (err.code == 'EEXIST')) {
		logger.info('Bus file already exists.');
	} else if (err) {
		throw err;
	} else {
		logger.info('Bus file created.');
	}
});

//Create taxis/announcements files if they don't already exist.
var announcementsData = "No announcements.";
fs.writeFile('public/files/Announcements.txt', announcementsData, { flag: 'wx' }, function(err, data) {
	if ((err) && (err.code == 'EEXIST')) {
		logger.info('Announcements file already exists.');
	} else if (err) {
		throw err;
	} else {
		logger.info('Announcements file created.');
	}
});

fs.writeFile('public/files/TaxiNameList.txt', "", { flag: 'wx' }, function(err, data) {
	if ((err) && (err.code == 'EEXIST')) {
		logger.info('Taxi name list file already exists.');
	} else if (err) {
		throw err;
	} else {
		logger.info('Taxi name list file created.');
	}
});

module.exports = app;

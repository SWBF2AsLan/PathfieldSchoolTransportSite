const { createLogger, format, transports, addColors } = require('winston');


const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'grey',
    verbose: 'magenta',
    debug: 'green',
    silly: 'magenta'
}

addColors(colors)

var logLevel;
if (process.env.NODE_ENV == 'production')  {
    logLevel = 'info';
} else {
    logLevel = 'debug';
}

module.exports = createLogger({
transports: [
    new transports.File({
	level: 'http',
    	filename: 'logs/server.log',
    	format:format.combine(
        	format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        	format.align(),
        	format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
    new transports.File({
	level: 'warn',
    	filename: 'logs/errors.log',
    	format:format.combine(
        	format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        	format.align(),
        	format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
    new transports.Console({
    	level: logLevel,
    	handleExceptions: true,
    	format:format.combine(
        	format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
		format.colorize({ all: true }),
        	format.align(),
        	format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )})
]
});

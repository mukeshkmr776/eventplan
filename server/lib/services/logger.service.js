const fs = require('fs');
const path = require('path');
const winston = require('winston');
const UtilityService = require('./utilities.service');

const { combine, colorize, timestamp, printf, splat } = winston.format;

let logger = null;
const LOGS_DIRECTORY = path.join(UtilityService.getProjectRoot(), 'logs');

const DEFAULT_FORMATTER = [
  splat(),
  timestamp({format: 'MM/DD/YYYY HH:mm:ss'}),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level} - ${message}`;
  })
]

function getConsole() {
  return new winston.transports.Console({
    format: combine(colorize(), ...DEFAULT_FORMATTER)
  })
}

function getFile() {
  return new winston.transports.File({
    format: combine(...DEFAULT_FORMATTER),
    filename: path.join(LOGS_DIRECTORY, 'application.log'),
    maxFiles: 5,
    tailable: true,
    maxsize: 1 * 1024 * 1024
  })
}

function addLoggerDefaults(logger) {  
  logger.add(getConsole());
  logger.add(getFile());
  return logger;
}

function getNewLogger() {
  const newLogger = winston.createLogger({level: 'info'});
  addLoggerDefaults(newLogger);
  return newLogger;
}

module.exports = {
  loadConfiguration: () => {
    if (fs.existsSync(LOGS_DIRECTORY)) {
      fs.mkdirSync(LOGS_DIRECTORY, {recursive: true});
    }
  },

  getLogger: () => {
    if (logger === null) {
      return getNewLogger();
    } else {
      return logger;
    }
  }
}

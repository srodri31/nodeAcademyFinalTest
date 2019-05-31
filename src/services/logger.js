const { createLogger, format, transports } = require('winston');
const { colorize, printf, combine, simple, timestamp, json } = format;

const errorLogger = createLogger({
  transports: [
    new transports.File({
      format: combine(
        timestamp(),
        printf(info => `[${info.level}] ${info.timestamp} ${info.message}`)
      ),
      filename: 'error.log',
      level: 'warn',
    }),
  ],
});

const infoLogger = createLogger({
    transports: [
      new transports.Console({
        level: "debug",
        format: combine(
          colorize(),
          timestamp(),
          printf(info => `[${info.level}] ${info.message}`)
        ),
      }),
      new transports.File({
          format: combine(
            printf(info => `[${info.level}] ${info.message}`)
          ),
          filename: 'info.log',
          level: 'info',
      })
    ],
  });

module.exports = {
    infoLogger,
    errorLogger
};

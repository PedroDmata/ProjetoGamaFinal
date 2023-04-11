import winston from "winston"
import path from 'path'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({stack: true}),
    winston.format.timestamp(),
    winston.format.json()
  ) ,
  defaultMeta: { service: 'hamburguergama' },
  transports: [
    new winston.transports.File({ filename: path.resolve('src','infra', 'logs', 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.resolve('src','infra', 'logs', 'combined.log'), }),
  ],
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger
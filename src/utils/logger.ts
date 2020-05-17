import winston, { Logger, LoggerOptions } from "winston";

const {
  combine, printf, metadata, timestamp,
} = winston.format;

const level = process.env.NODE_ENV === "production" ? "info" : "debug";
const options: LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: combine(
        winston.format((info) => {
          // eslint-disable-next-line no-param-reassign
          info.correlationId = "no-correlation-id";
          return info;
        })(),
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        metadata({ fillExcept: ["message", "level", "timestamp", "label", "correlationId"] }),
        printf((info) => `${info.timestamp}:${info.level}[${info.correlationId}]} - ${JSON.stringify(info.message, null, 2)} ${JSON.stringify(info.metadata, null, 2)}`),
      ),
      level,
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
};

const logger: Logger = winston.createLogger(options);

export default logger;

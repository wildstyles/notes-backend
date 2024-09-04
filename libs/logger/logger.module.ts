import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';

@Module({})
export class LoggerModule {
  static forRoot() {
    return PinoLoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        base: null,
        useLevel: 'debug',
        genReqId: (req) => {
          console.log('genReqId');
          const reqId = req.headers['x-request-id'] || uuid();

          return reqId;
        },
        quietReqLogger: true,
        // customProps: (req, res) => ({
        //   context: 'HTTP',
        // }),
        transport: {
          level: 'debug',
          target: 'pino-pretty',
          options: { singleLine: true, colorize: true },
        },
      },
    });
  }
}

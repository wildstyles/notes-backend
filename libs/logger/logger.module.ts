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
          return req.headers['x-request-id'] || uuid();
        },
        quietReqLogger: true,
        transport: {
          targets: [
            {
              level: 'debug',
              target: 'pino-pretty',
              options: { singleLine: true, colorize: true },
            },
          ],
        },
      },
    });
  }
}

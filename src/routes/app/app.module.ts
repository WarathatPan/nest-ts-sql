import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from 'src/common';
import TypeOrmConfigService from '@config/typeorm/default';
import configuration from '@config/configuration';
import V1Module from '@routes/v1/v1.module';

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          filename: `${process.env.FILE_PATH}/%DATE%/${process.env.APP_NAME}_${process.env.BUILD_ID}_%DATE%.log`,
          datePattern: process.env.DATE_PATTERN,
          zippedArchive: false,
          maxFiles: '1d',
        }),
      ],
    }),
    RedisModule.forRoot({
      config: [
        {
          namespace: 'redis',
          url: process.env.REDIS_URL,
          keepAlive: 10000,
          enableAutoPipelining: true,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    HttpModule,
    CommonModule,
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(RequireAuthMiddleware)
    //   .forRoutes('*');
  }
}

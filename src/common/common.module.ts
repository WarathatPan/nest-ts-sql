import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as providers from './providers';

@Global()
@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: +configService.get('HTTP_TIMEOUT'),
        maxRedirects: +configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class CommonModule {}

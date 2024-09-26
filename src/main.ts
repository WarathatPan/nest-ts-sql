// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from '@config/config.swagger';
import ValidationExceptions from '@common/exceptions/validation.exceptions';
import * as bearerToken from 'express-bearer-token';

import AllExceptionsFilter from '@common/filters/all-exceptions.filter';
import AppModule from '@routes/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bearerToken());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationExceptions(errors),
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.SERVER_PORT || 3000;

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}
bootstrap();

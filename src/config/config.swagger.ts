import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Prediction Application')
  .setDescription('APIs for the main Prediction application')
  .setVersion('1.0.0')
  // .addBearerAuth(
  //   {
  //     type: 'http',
  //     scheme: 'bearer',
  //     bearerFormat: 'JWT',
  //     description: 'Enter SSO token',
  //     in: 'header',
  //   },
  //   'sso-token',
  // )
  .build();

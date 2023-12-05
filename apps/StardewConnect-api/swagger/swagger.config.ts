import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('StardewConnect API')
  .setDescription('API for a school project build around Stardew Valley.')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Event')
  .addTag('Town')
  .addTag('User')
  .addTag('Villager')
  .build();

export const setupSwagger = (app) => {
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
};

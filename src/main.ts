import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
    transform: true,
     whitelist: true,
  }));
   app.enableVersioning({
    type: VersioningType.URI, 
    prefix: 'v',
  });
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();

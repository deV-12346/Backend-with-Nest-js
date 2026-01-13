import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import  cookieparser from "cookie-parser"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.use(cookieparser())
  app.useGlobalPipes( new ValidationPipe({
    forbidNonWhitelisted:true,
    forbidUnknownValues:true,
    whitelist:true
  }))
}
bootstrap();

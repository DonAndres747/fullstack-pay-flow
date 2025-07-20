import { NestFactory } from '@nestjs/core';
import * as crypto from 'crypto';

import { AppModule } from './app.module';

(global as any).crypto = crypto;

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.56.1:3000', 'http://192.168.0.4:3000'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

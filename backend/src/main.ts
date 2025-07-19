import { NestFactory } from '@nestjs/core';
import * as crypto from 'crypto';  

import { AppModule } from './app.module';

(global as any).crypto = crypto;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

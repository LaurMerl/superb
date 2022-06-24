import { NestFactory } from '@nestjs/core';
import { BookingManagerModule } from './booking-manager.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingManagerModule);
  await app.listen(3000);
}
bootstrap();

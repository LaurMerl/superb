import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingManagerController } from './booking-manager.controller';
import { BookingManagerService } from './booking-manager.service';
import { ReservationModule } from './reservation/reservation.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    RestaurantModule,
    ReservationModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/local'),
  ],
  controllers: [BookingManagerController],
  providers: [BookingManagerService],
})
export class BookingManagerModule {}

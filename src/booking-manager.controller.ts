import { Controller, Get } from '@nestjs/common';
import { BookingManagerService } from './booking-manager.service';
import { Restaurant } from './restaurant/models/restaurant.schema';

@Controller()
export class BookingManagerController {
  constructor(private readonly bookingManagerService: BookingManagerService) {}

  @Get('restaurants')
  getRestaurants(): Promise<Restaurant[]> {
    return this.bookingManagerService.getRestaurants();
  }
}

import { Controller, Get } from '@nestjs/common';
import { BookingManagerService } from './booking-manager.service';
import { IResponse } from './response.dto';
import { Restaurant } from './restaurant/models/restaurant.schema';

@Controller()
export class BookingManagerController {
  constructor(private readonly bookingManagerService: BookingManagerService) {}

  @Get('restaurants')
  async getRestaurants(): Promise<IResponse<Restaurant[]>> {
    return { data: await this.bookingManagerService.getRestaurants() };
  }
}

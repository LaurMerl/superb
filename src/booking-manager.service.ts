import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant/models/restaurant.schema';
import { RestaurantService } from './restaurant/restaurant.service';

@Injectable()
export class BookingManagerService {
  constructor(private restaurantService: RestaurantService) {}

  async getRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantService.getRestaurants();
  }
}

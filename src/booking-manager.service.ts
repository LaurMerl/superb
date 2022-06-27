import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant/models/restaurant.schema';
import { RestaurantService } from './restaurant/restaurant.service';

@Injectable()
export class BookingManagerService {
  constructor(private restaurantService: RestaurantService) {
    // This is here for initialization purpose only
    this.addExample();
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantService.getRestaurants();
  }

  async addExample() {
    return await this.restaurantService._addRestaurant();
  }
}

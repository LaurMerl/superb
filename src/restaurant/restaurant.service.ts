import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TablesDto } from './models/restaurant.dto';
import { Restaurant, RestaurantDocument } from './models/restaurant.schema';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>
  ) {}

  async getRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantModel.find().exec();
  }

  async setAddTables(
    restaurantId: string,
    newTables: number
  ): Promise<TablesDto> {
    const currentTableValue = await this.getTables(restaurantId);

    return new TablesDto(
      await this.restaurantModel
        .findByIdAndUpdate(
          { _id: restaurantId },
          {
            tables: (currentTableValue.updatedNumberOfTables += newTables),
          },
          { new: true }
        )
        .exec()
    );
  }

  async setRemoveTables(
    restaurantId: string,
    newTables: number
  ): Promise<TablesDto> {
    const currentTableValue = await this.getTables(restaurantId);

    return new TablesDto(
      await this.restaurantModel
        .findByIdAndUpdate(
          { _id: restaurantId },
          { tables: (currentTableValue.updatedNumberOfTables -= newTables) },
          { new: true, projection: { tables: 1 } }
        )
        .exec()
    );
  }

  async getTables(restaurantId: string): Promise<TablesDto> {
    return new TablesDto(
      await this.restaurantModel
        .findOne({ _id: restaurantId }, { _id: 0, tables: 1 })
        .exec()
    );
  }
}

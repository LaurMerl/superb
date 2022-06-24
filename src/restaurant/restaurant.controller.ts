import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { IResponse } from 'src/response.dto';
import { TablesDto } from './models/restaurant.dto';
import { Tables } from './models/restaurant.interfaces';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Put('/:restaurantId/add-tables')
  async setAddRestaurantTables(
    @Param('restaurantId') restaurantId: string,
    @Body() body: Tables
  ): Promise<IResponse<TablesDto>> {
    return {
      data: await this.restaurantService.setAddTables(
        restaurantId,
        body.tables
      ),
    };
  }

  @Put('/:restaurantId/remove-tables')
  async setRemoveRestaurantTables(
    @Param('restaurantId') restaurantId: string,
    @Body() body: Tables
  ): Promise<IResponse<TablesDto>> {
    return {
      data: await this.restaurantService.setRemoveTables(
        restaurantId,
        body.tables
      ),
    };
  }

  @Get('/:restaurantId/tables')
  async getRestaurantTables(
    @Param('restaurantId') restaurantId: string
  ): Promise<IResponse<TablesDto>> {
    return { data: await this.restaurantService.getTables(restaurantId) };
  }
}

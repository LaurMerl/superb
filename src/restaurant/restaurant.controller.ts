import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { IResponse } from 'src/response.dto';
import { OpeningTimesDto, TablesDto } from './models/restaurant.dto';
import { OpeningTimes, Tables } from './models/restaurant.interfaces';
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

  @Put('/:restaurantId/openings')
  async setRestaurantTime(
    @Param('restaurantId') restaurantId: string,
    @Body() body: OpeningTimes
  ): Promise<IResponse<OpeningTimesDto>> {
    const blah = await this.restaurantService.setOpeningTimes(
      restaurantId,
      body
    );
    return {
      data: blah,
    };
  }

  @Get('/:restaurantId/openings')
  async getRestaurantTimes(
    @Param('restaurantId') restaurantId: string
  ): Promise<IResponse<OpeningTimesDto>> {
    return { data: await this.restaurantService.getOpeningTimes(restaurantId) };
  }
}

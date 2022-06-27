import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IResponse } from 'src/response.dto';
import { ReservationDto } from './models/reservation.dto';
import { IReservation } from './models/reservation.interfaces';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/:restaurantId/reservation')
  async addRestaurantReservation(
    @Param('restaurantId') restaurantId: string,
    @Body() body: IReservation
  ): Promise<IResponse<ReservationDto>> {
    return {
      data: await this.reservationService.addReservation(restaurantId, body),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantService } from '../restaurant/restaurant.service';
import { timeSplit } from '../utils/time-split';
import { IReservation } from './models/reservation.interfaces';
import { Reservation, ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private restaurantService: RestaurantService
  ) {}

  async addReservation(
    restaurantId: string,
    reservation: IReservation
  ): Promise<any> {
    // From the frotned will come as new Date('August 19, 1975 23:15:30');
    // the bached will handle all dates as per UTC so:
    // First, converts the input date
    // then check the day of the week
    // lastly, check the time
    const startDate = new Date(reservation.time);
    const endDate = new Date(
      new Date(reservation.time).setHours(startDate.getHours() + 1)
    );
    const utcFormatReservationTimeDay = startDate.getUTCDay();
    const utcFormatReservationTimeHoursMinutes = timeSplit(
      `${startDate.getUTCHours()}:${startDate.getUTCMinutes()}`
    );

    // those action should to be done *atomically* in a transaction BUT
    // MongoDB currently only supports transactions on replica sets, not standalone servers
    // http://thecodebarbarian.com/a-node-js-perspective-on-mongodb-4-transactions.html
    // const session = await startSession();
    // session.startTransaction();
    // try {
    // is the restaurant open during the reservation
    const isOpen = await this.restaurantService._isOpenAtTime(
      restaurantId,
      utcFormatReservationTimeDay,
      utcFormatReservationTimeHoursMinutes
    );

    if (!isOpen) {
      return 'Restaurant is closed';
    }

    // number of reservation fo that time slot
    const alreadyBooked = await this.reservationModel
      .find({
        $or: [
          {
            $and: [{ from: { $gte: startDate } }, { from: { $lte: endDate } }],
          },
          { $and: [{ to: { $gte: startDate } }, { to: { $lte: endDate } }] },
          { from: { $eq: startDate } },
        ],
      })
      .count();

    const tablesAvailable = await this.restaurantService.getTables(
      restaurantId
    );

    if (alreadyBooked >= tablesAvailable.updatedNumberOfTables) {
      return 'Restaurant is full';
    }

    await this.reservationModel.create({
      restaurant: restaurantId,
      name: reservation.name,
      tables: reservation.tables,
      from: startDate,
      to: endDate,
    });

    //   await session.commitTransaction();
    //   session.endSession();
    // } catch (error) {
    //   // If an error occurred, abort the whole transaction and
    //   // undo any changes that might have happened
    //   await session.abortTransaction();
    //   session.endSession();
    //   throw error; // Rethrow so calling function sees error
    // }

    return 'OK';
  }
}

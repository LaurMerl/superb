import { IReservation } from './reservation.interfaces';

export class ReservationDto {
  public reservation: IReservation;

  constructor(reservation: IReservation) {
    this.reservation = reservation;
  }
}

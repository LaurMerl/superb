import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop()
  restaurant: string;

  @Prop()
  name: string;

  @Prop({ type: Number, default: 1 })
  tables = Number;

  @Prop({ type: Date })
  from: Date;

  @Prop({ type: Date })
  to: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

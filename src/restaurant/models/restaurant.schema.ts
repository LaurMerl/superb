import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OpeningTimes } from './restaurant.interfaces';

const OpeningTimesSchema = {
  monday: {
    lunch: {
      from: String,
      to: String,
    },
    dinner: {
      from: String,
      to: String,
    },
  },
  tuesday: {
    lunch: {
      from: String,
      to: String,
    },
    dinner: {
      from: String,
      to: String,
    },
  },
};

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop({ type: OpeningTimesSchema })
  openingTimes: OpeningTimes;

  @Prop()
  tables: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

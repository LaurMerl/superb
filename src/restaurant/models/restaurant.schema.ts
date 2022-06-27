import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OpeningTimes } from './restaurant.interfaces';

const OpeningTimesSchema = {
  1: {
    lunch: {
      from: {
        hours: Number,
        minutes: Number,
      },
      to: {
        hours: Number,
        minutes: Number,
      },
    },
    dinner: {
      from: {
        hours: Number,
        minutes: Number,
      },
      to: {
        hours: Number,
        minutes: Number,
      },
    },
  },
  2: {
    lunch: {
      from: {
        hours: Number,
        minutes: Number,
      },
      to: {
        hours: Number,
        minutes: Number,
      },
    },
    dinner: {
      from: {
        hours: Number,
        minutes: Number,
      },
      to: {
        hours: Number,
        minutes: Number,
      },
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

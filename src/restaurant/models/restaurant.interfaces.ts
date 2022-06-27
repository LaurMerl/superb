import { HoursMinutes } from 'src/utils/time-split';

export interface IRestaurant {
  name: string;
  openingTimes: OpeningTimes;
  tables: number;
}

export type OpeningTimes = {
  1: Times | undefined;
  2: Times | undefined;
};

export type Tables = {
  tables: number;
};

export type Times = {
  lunch: {
    from: HoursMinutes;
    to: HoursMinutes;
  };
  dinner: {
    from: HoursMinutes;
    to: HoursMinutes;
  };
};

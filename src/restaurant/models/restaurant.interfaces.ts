export interface IRestaurant {
  name: string;
  openingTimes: OpeningTimes;
  tables: number;
}

export type OpeningTimes = {
  monday: Times | undefined;
  tuesday: Times | undefined;
};

export type Tables = {
  tables: number;
};

type Times = {
  lunch: {
    from: string;
    to: string;
  };
  dinner: {
    from: string;
    to: string;
  };
};

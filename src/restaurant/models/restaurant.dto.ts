import { OpeningTimes, Tables } from './restaurant.interfaces';

export class TablesDto {
  public updatedNumberOfTables: number;

  constructor(tables: Tables) {
    this.updatedNumberOfTables = tables.tables;
  }
}

export class OpeningTimesDto {
  public openingTimes: OpeningTimes;

  constructor(openingTimes: OpeningTimes) {
    this.openingTimes = openingTimes;
  }
}

import { Tables } from './restaurant.interfaces';

export class TablesDto {
  public updatedNumberOfTables: number;

  constructor(tables: Tables) {
    this.updatedNumberOfTables = tables.tables;
  }
}

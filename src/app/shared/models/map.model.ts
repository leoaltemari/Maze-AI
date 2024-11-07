import { Cell } from './cell.model';

export interface MapRow {
  id: string;
  cells: {
    id: string;
    cell: Cell;
  }[];
}

export interface IMap {
  rows: MapRow[];
}

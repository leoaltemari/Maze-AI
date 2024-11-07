export enum CellType {
  Source = 'source',
  Target = 'target',
  Empty = 'empty',
  Wall = 'wall',
  Path = 'path',
  Expanded = 'expanded',
}

export class Cell {
  x: number | undefined;
  y: number | undefined;
  type: CellType;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.type = CellType.Empty;
  }
}

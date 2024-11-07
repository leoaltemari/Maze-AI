export enum CellType {
  Source,
  Target,
  Wall,
  Empty,
  Path,
  Expanded,
}

export enum CellIcon {
  Source = '#',
  Target = '&',
  Wall = '-',
  Empty = '*',
  Path = '@',
  Expanded = '+',
}

export enum CellActions {
  Source,
  Target,
  Wall,
}

export interface Position {
  x: number;
  y: number;
}

export class Cell {
  position: Position = { x: 0, y: 0 };
  type: CellType = CellType.Empty;

  constructor(x: number, y: number, icon: CellIcon = CellIcon.Empty) {
    this.position = { x, y };

    const iconToCellTypeMap = {
      [CellIcon.Source]: CellType.Source,
      [CellIcon.Target]: CellType.Target,
      [CellIcon.Wall]: CellType.Wall,
      [CellIcon.Empty]: CellType.Empty,
      [CellIcon.Path]: CellType.Path,
      [CellIcon.Expanded]: CellType.Expanded,
    };
    this.type = iconToCellTypeMap[icon];
  }
}

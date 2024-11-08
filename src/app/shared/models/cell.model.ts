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

/** Indicates on which type the cell will turn when the user clicks on it */
export enum TurnCellInto {
  Source,
  Target,
  Wall,
}

export interface Position {
  x: number;
  y: number;
}

const iconToCellTypeMap = {
  [CellIcon.Source]: CellType.Source,
  [CellIcon.Target]: CellType.Target,
  [CellIcon.Wall]: CellType.Wall,
  [CellIcon.Empty]: CellType.Empty,
  [CellIcon.Path]: CellType.Path,
  [CellIcon.Expanded]: CellType.Expanded,
};

const cellTypeToIconMap = {
  [CellType.Source]: CellIcon.Source,
  [CellType.Target]: CellIcon.Target,
  [CellType.Wall]: CellIcon.Wall,
  [CellType.Empty]: CellIcon.Empty,
  [CellType.Path]: CellIcon.Path,
  [CellType.Expanded]: CellIcon.Expanded,
};

export class Cell {
  private _icon: CellIcon = CellIcon.Empty;
  private _type: CellType = CellType.Empty;
  private _position: Position = { x: 0, y: 0 };

  constructor(x: number, y: number, icon: CellIcon = CellIcon.Empty) {
    this._position = { x, y };
    this._icon = icon;
    this._type = iconToCellTypeMap[icon];
  }

  get position() {
    return this._position;
  }

  get type() {
    return this._type;
  }
  set type(cellType: CellType) {
    this._type = cellType;
    this._icon = cellTypeToIconMap[cellType];
  }

  set icon(icon: CellIcon) {
    this._icon = icon;
  }
}

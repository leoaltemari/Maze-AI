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

export const iconToCellTypeMap = {
  [CellIcon.Source]: CellType.Source,
  [CellIcon.Target]: CellType.Target,
  [CellIcon.Wall]: CellType.Wall,
  [CellIcon.Empty]: CellType.Empty,
  [CellIcon.Path]: CellType.Path,
  [CellIcon.Expanded]: CellType.Expanded,
};

export const cellTypeToIconMap = {
  [CellType.Source]: CellIcon.Source,
  [CellType.Target]: CellIcon.Target,
  [CellType.Wall]: CellIcon.Wall,
  [CellType.Empty]: CellIcon.Empty,
  [CellType.Path]: CellIcon.Path,
  [CellType.Expanded]: CellIcon.Expanded,
};

export class Cell {
  /** Strin icon that represents the type of cell on the map */
  private _icon: CellIcon = CellIcon.Empty;
  /** Stores the type of the cell, if it is an empty cell, a source cell, etc. */
  private _type: CellType = CellType.Empty;
  /** Current position that the cell has on the map */

  private _position: Position;

  /** Value that represents the _heuristic() value from the current cell to the target cell */
  costFromSource: number;
  /** Euclidean distance from the current cell to target */
  distanceToTarget: number;
  totalCost: number = 0;

  /** Stores the cell that the was being visited before the current cell. It will stores null
   * if it is the first cell being visited on the map */
  parent: Cell | null;

  constructor(
    { x, y }: Position,
    g = 0,
    h = 0,
    parent: Cell | null = null,
    type: CellType = CellType.Empty,
  ) {
    this._position = { x, y };
    this._icon = cellTypeToIconMap[type];
    this._type = type;
    this.costFromSource = g;
    this.distanceToTarget = h;
    this.totalCost = g + h;
    this.parent = parent;
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
  get icon(): CellIcon {
    return this._icon;
  }
}

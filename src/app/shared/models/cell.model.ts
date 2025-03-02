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

export const typeToBackgroundColorMap: Record<CellType, string> = {
  [CellType.Empty]: 'bg-grey',
  [CellType.Wall]: 'bg-grey-3',
  [CellType.Source]: 'bg-green',
  [CellType.Target]: 'bg-red',
  [CellType.Path]: 'bg-blue',
  [CellType.Expanded]: 'bg-light-green',
};

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

export const cellTypeToIconMap: Record<CellType, CellIcon> = {
  [CellType.Source]: CellIcon.Source,
  [CellType.Target]: CellIcon.Target,
  [CellType.Wall]: CellIcon.Wall,
  [CellType.Empty]: CellIcon.Empty,
  [CellType.Path]: CellIcon.Path,
  [CellType.Expanded]: CellIcon.Expanded,
};

export class Cell {
  /** String icon that represents the type of cell on the maze */
  private _icon: CellIcon = CellIcon.Empty;

  /** Stores the type of the cell, if it is an empty cell, a source cell, etc. */
  private _type: CellType = CellType.Empty;

  /** Current position that the cell has on the maze */
  private _position: Position;

  /** Value that represents the _heuristic() value from the current cell to the target cell */
  costFromSource: number;

  /** Euclidean distance from the current cell to target */
  distanceToTarget: number;
  totalCost: number = 0;

  /**
   * Stores the cell that the was being visited before the current cell. It will stores null
   * if it is the first cell being visited on the maze
   */
  parent: Cell | null;

  constructor(
    { x, y }: Position,
    parent: Cell | null = null,
    g = 0,
    h = 0,
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

  get position(): Position {
    return this._position;
  }

  get type(): CellType {
    return this._type;
  }
  set type(cellType: CellType) {
    this._type = cellType;
    this._icon = cellTypeToIconMap[cellType];
  }

  get icon(): CellIcon {
    return this._icon;
  }
  set icon(icon: CellIcon) {
    this._icon = icon;
  }
}

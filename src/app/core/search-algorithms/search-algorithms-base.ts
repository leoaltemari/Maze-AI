import { Cell, CellIcon, Heuristic, MapMatrix, Position } from '@models';
import { equalPositions, euclideanDistance } from '@utils';

export class SearchAlgorithmBase {
  /** Method that will return a numeric relationship between two cells
   * @example
   * Manhattan distance or Euclidean distance can represent the numerical relationship
   * between two cells.
   */
  protected _heuristic!: Heuristic;

  protected _map!: MapMatrix;
  protected _mapRows!: number;
  protected _mapColumns!: number;

  protected _sourcePos!: Position;
  protected _targetPos?: Position;

  protected _path: Position[] = [];
  protected _expandedCells: Position[] = [];

  protected readonly _directions: [number, number][] = [
    [0, 1] /** right */,
    [1, 0] /** bottom */,
    [0, -1] /** left */,
    [-1, 0] /** up */,
  ];

  constructor(
    map: MapMatrix,
    sourcePos: Position,
    targetPos?: Position,
    heuristic: Heuristic = euclideanDistance,
  ) {
    this._map = map;
    this._mapRows = map.length;
    this._mapColumns = map[0].length;

    this._heuristic = heuristic;
    this._sourcePos = sourcePos ?? undefined;
    this._targetPos = targetPos ?? undefined;
  }

  /** Returns the path generated not considering neither the source or the target */
  get path(): Position[] {
    return this._path.slice(1, this._path.length - 1);
  }

  /** Returns cells that was visited and are not on the path */
  get expanded(): Position[] {
    return this._expandedCells.filter(
      (expanded) => !this._path.some((path) => equalPositions(expanded, path)),
    );
  }

  protected isTarget({ x, y }: Position): boolean {
    return this._map[x][y] === CellIcon.Target;
  }

  protected canAccessCell({ x, y }: Position, cellsAlreadyVisited: Cell[] = []): boolean {
    return (
      x >= 0 &&
      x < this._mapRows &&
      y >= 0 &&
      y < this._mapColumns &&
      this._map[x][y] !== CellIcon.Wall &&
      !cellsAlreadyVisited.some(({ position }) => position.x === x && position.y === y)
    );
  }

  run(): void {
    throw new Error('run() method must be implemented!');
  }
}

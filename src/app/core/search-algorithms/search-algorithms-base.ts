import { Cell, CellIcon, Heuristic, MazeMatrix, Position } from '@models';
import { equalPositions, euclideanDistance } from '@utils';

export class SearchAlgorithmBase {
  /** Method that will return a numeric relationship between two cells
   * @example
   * Manhattan distance or Euclidean distance can represent the numerical relationship
   * between two cells.
   */
  protected _heuristic!: Heuristic;

  protected _maze!: MazeMatrix;
  protected _mazeRows!: number;
  protected _mazeColumns!: number;

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
    maze: MazeMatrix,
    sourcePos: Position,
    targetPos?: Position,
    heuristic: Heuristic = euclideanDistance,
  ) {
    this._maze = maze;
    this._mazeRows = maze.length;
    this._mazeColumns = maze[0].length;

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

  /**
   * Format the path backtracking the target cell to its parent, recursively,
   * until it finds the source cell (has no parent cell, parent === null)
   */
  protected backtrackingPath(target: Cell): Position[] {
    const path: Position[] = [];

    let temp: Cell | null = target;

    while (temp) {
      path.push({ x: temp.position.x, y: temp.position.y });
      temp = temp.parent;
    }

    return path.reverse();
  }

  protected isTarget({ x, y }: Position): boolean {
    return this._maze[x][y] === CellIcon.Target;
  }

  protected canAccessCell({ x, y }: Position, cellsAlreadyVisited: Cell[] = []): boolean {
    return (
      x >= 0 &&
      x < this._mazeRows &&
      y >= 0 &&
      y < this._mazeColumns &&
      this._maze[x][y] !== CellIcon.Wall &&
      !cellsAlreadyVisited.some(({ position }) => position.x === x && position.y === y)
    );
  }

  run(): void {
    throw new Error('run() method must be implemented!');
  }
}

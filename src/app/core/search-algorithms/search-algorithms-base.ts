import { Cell, CellIcon, Heuristic, MazeMatrix, Position } from '@models';
import { euclideanDistance } from '@utils';

export class SearchAlgorithmBase {
  /**
   * Method that will return a numeric relationship between two cells
   * @example
   * Manhattan distance or Euclidean distance can represent the numerical relationship
   * between two cells using a calculation to measure the distance between them.
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

  /** Returns cells that were visited */
  get expanded(): Position[] {
    return this._expandedCells.slice(1, this._expandedCells.length - 1);
  }

  /**
   * Format the path backtracking the target cell to its parent,
   * until it finds the source cell (has no parent cell, parent === null)
   *
   * @param target: The {x, y} pair that represents the target position.
   * @return An array of {x, y} pairs representing a maze path.
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

  /**
   * Verifies if an {x, y} pair is the target position.
   *
   * @returns `true` if is the target, `false` otherwise.
   */
  protected isTarget({ x, y }: Position): boolean {
    return this._maze[x][y] === CellIcon.Target;
  }

  /**
   * Verifies if an cell, can be accessed, checking if the cell is on the maze boundaries, if it is nota a Wall
   * and if the cell was not visited before.
   *
   * @param cell The {x, y} pair from the cell that will be checked.
   * @param cellsAlreadyVisited set of `Cell` type with the cells that were already visited by the algorithm.
   *
   * @return `true` if the cell passed can be visited, `false` otherwise.
   */
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

  /**
   * Runs the search algorithm.
   * @remarks This method must be implemented in the algorithm class.
   */
  run(): void {
    throw new Error('run() method must be implemented!');
  }
}

import { inject, Injectable, Signal, signal } from '@angular/core';

import { Cell, CellIcon, CellType, Maze, Position, TurnCellInto } from '@models';
import { MazeInteractionService } from '@services';

@Injectable()
export class MazeBuilderService {
  private readonly mazeInteractionService = inject(MazeInteractionService);

  /** Store maze matrix where each matrix position matches a cell type
   * @example
   * mazeMatrix[0][2] is the soruce, mazeMatrix[0][7] is the target.
   * --#--***--
   * --*--*-*--
   * --****-*--
   * --*----*--
   * --*****$--  */
  private readonly _mazeMatrix = signal<Maze>([]);
  get mazeMatrixAsSignal(): Signal<Maze> {
    return this._mazeMatrix.asReadonly();
  }
  get mazeMatrix(): Maze {
    return this._mazeMatrix();
  }
  set mazeMatrix(cells: Maze) {
    this._mazeMatrix.set(cells);
  }

  get mazeAsStringMatrix(): CellIcon[][] {
    return this._mazeMatrix().map((rows) => rows.map(({ icon }) => icon));
  }

  private _sourcePos: Position | undefined;
  get sourcePos() {
    return this._sourcePos;
  }
  private _targetPos: Position | undefined;
  get targetPos() {
    return this._targetPos;
  }

  isPath = (pos: Position) => this.cellIsFromType(pos, CellType.Path);
  isWall = (pos: Position) => this.cellIsFromType(pos, CellType.Wall);
  isSource = (pos: Position) => this.cellIsFromType(pos, CellType.Source);
  isTarget = (pos: Position) => this.cellIsFromType(pos, CellType.Target);

  private cellIsFromType({ x, y }: Position, type: CellType): boolean {
    return this.mazeMatrix[x][y].type === type;
  }

  updateCellType({ x, y }: Position, newType: CellType): void {
    this._mazeMatrix.update((matrix) => {
      matrix[x][y].type = newType;
      return matrix;
    });
  }

  /**
   * Method to fill up the initial maze matrix with empty cells.
   * @param dimension number of rows and columns that the maze will have (always a quadratic form matrix).
   */
  buildMaze(size: number): void {
    const maze: Maze = [];

    for (let i = 0; i < size; i++) {
      maze.push([]);

      for (let j = 0; j < size; j++) {
        maze[i].push(new Cell({ x: i, y: j }));
      }
    }

    this._mazeMatrix.set(maze);
  }

  /**
   * Clear all cells from maze that are from a certain type.
   * @param type Type of the cell that will be cleard from the maze.
   */
  clear(type: CellType): void {
    this._mazeMatrix.update((mazeMatrix) => {
      mazeMatrix.forEach((matrixRows, i) => {
        matrixRows.forEach((cell) => {
          if (cell.type === type) {
            cell.type = CellType.Empty;
          }
        });
      });

      return mazeMatrix;
    });
  }

  changeCellTypeOnAction(cellPosition: Position): void {
    switch (this.mazeInteractionService.turnCellInto) {
      case TurnCellInto.Wall:
        const newType = this.isWall(cellPosition) ? CellType.Empty : CellType.Wall;
        this.updateCellType(cellPosition, newType);
        break;

      case TurnCellInto.Source:
        /** Removes any source that already exists */
        if (this.sourcePos) {
          this.updateCellType(this.sourcePos, CellType.Empty);
        }

        this.updateCellType(cellPosition, CellType.Source);
        this._sourcePos = cellPosition;
        break;

      case TurnCellInto.Target:
        /** Removes any target that already exists */
        if (this.targetPos) {
          this.updateCellType(this.targetPos, CellType.Empty);
        }

        this.updateCellType(cellPosition, CellType.Target);
        this._targetPos = cellPosition;
        break;
    }
  }
}

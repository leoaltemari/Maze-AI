import { Injectable, Signal, signal } from '@angular/core';

import { Cell, CellIcon, CellType, Maze, Position, TurnCellInto } from '@models';

@Injectable()
export class MazeBuilderService {
  /**
   * Stores maze matrix where each matrix position matches a cell type.
   *
   * @example
   * mazeMatrix[0][2] is the soruce, mazeMatrix[0][7] is the target.
   * --#--***--
   * --*--*-*--
   * --****-*--
   * --*----*--
   * --*****$--
   */
  private readonly _mazeMatrix = signal<Maze>([]);
  get mazeMatrixAsSignal(): Signal<Maze> {
    return this._mazeMatrix.asReadonly();
  }
  set mazeMatrix(cells: Maze) {
    this._mazeMatrix.set(cells);
  }

  get mazeAsStringMatrix(): CellIcon[][] {
    return this._mazeMatrix().map((rows) => rows.map(({ icon }) => icon));
  }

  private _sourcePos: Position | undefined;
  get sourcePos(): Position | undefined {
    return this._sourcePos;
  }
  private _targetPos: Position | undefined;
  get targetPos(): Position | undefined {
    return this._targetPos;
  }

  /**
   * Method to change the cell type into the new type passed.
   *
   * @param cellPos {x, y} pair from the cell that will be changed the type.
   * @param newType The new type that will be asigned into the cell.
   */
  updateCellType({ x, y }: Position, newType: CellType): void {
    /** Only changes if it is a new type */
    if (this._mazeMatrix()[x][y].type === newType) {
      return;
    }

    this._mazeMatrix.update((matrix) => {
      matrix[x][y].type = newType;
      return matrix;
    });
  }

  /**
   * Method to fill up the initial maze matrix with empty cells.
   *
   * @param size Number of rows and columns that the maze will have (the maze will always be a square matrix).
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
   * Clears all cells in the maze from an specific type.
   * @param type Type of the cell that will be cleard from the maze.
   */
  clear(type: CellType): void {
    this._mazeMatrix.update((mazeMatrix) => {
      mazeMatrix.forEach((matrixRows) => {
        matrixRows.forEach((cell) => {
          if (cell.type === type) {
            cell.type = CellType.Empty;
          }
        });
      });

      return mazeMatrix;
    });
  }

  clearMaze(): void {
    this.clear(CellType.Wall);
    this.clear(CellType.Path);
    this.clear(CellType.Expanded);
    this.clear(CellType.Source);
    this.clear(CellType.Target);

    this._sourcePos = undefined;
    this._targetPos = undefined;
  }

  turnCellInto(cellPosition: Position, newCellType: TurnCellInto): void {
    switch (newCellType) {
      case TurnCellInto.Wall:
        const { x, y } = cellPosition;
        const { type: oldType } = this._mazeMatrix()[x][y];

        this.updateCellType(
          cellPosition,
          oldType === CellType.Wall ? CellType.Empty : CellType.Wall,
        );
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

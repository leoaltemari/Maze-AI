import { Injectable, Signal, signal } from '@angular/core';

import { Cell, CellType, IMap, Position, TurnCellInto } from '@models';
import { MapInteractionService } from '@services';


@Injectable({
  providedIn: 'root',
})
export class MapBuilderService {
  /** Store map matrix where each matrix position matches a cell type
   * @example
   * mapMatrix[0][2] is the soruce, mapMatrix[0][7] is the target.
   * --#--***--
   * --*--*-*--
   * --****-*--
   * --*----*--
   * --*****$--
   */
  private readonly _mapMatrix = signal<IMap>([]);
  get mapMatrixAsSignal(): Signal<IMap> {
    return this._mapMatrix;
  }
  get mapMatrix(): IMap {
    return this._mapMatrix();
  }
  set mapMatrix(cells: IMap) {
    this._mapMatrix.set(cells);
  }

  private mapDimention = 32;
  private sourcePos: Position | undefined;
  private targetPos: Position | undefined;

  constructor(private readonly mapInteractionService: MapInteractionService) {}

  /**
   * Method to fill up the initial map matrix with empty cells.
   * @param dimension number of rows and columns that the map will have (always a quadratic form matrix).
   */
  buildInitialMap(dimension: number): void {
    this.mapDimention = dimension;
    const map: IMap = [];

    for (let i = 0; i < this.mapDimention; i++) {
      map.push([]);
      for (let j = 0; j < this.mapDimention; j++) {
        map[i].push(new Cell(i, j));
      }
    }

    this.mapMatrix = map;
  }

  clearAllMapWalls(): void {
    for (let i = 0; i < this.mapDimention; i++) {
      for (let j = 0; j < this.mapDimention; j++) {
        const cell = this._mapMatrix()[i][j];

        if (cell.type === CellType.Wall) {
          cell.type = CellType.Empty;
        }
      }
    }
  }

  changeCellTypeOnAction(cellPosition: Position): void {
    const currentCell = this._mapMatrix()[cellPosition.x][cellPosition.y];

    switch (this.mapInteractionService.turnCellInto) {
      case TurnCellInto.Wall:
        currentCell.type =
          currentCell.type === CellType.Wall ? CellType.Empty : CellType.Wall;
        break;

      case TurnCellInto.Source:
        /** Removes any source that already exists */
        if (this.sourcePos) {
          const { x, y } = this.sourcePos;
          this._mapMatrix()[x][y].type = CellType.Empty;
        }

        currentCell.type = CellType.Source;
        this.sourcePos = currentCell.position;
        break;

      case TurnCellInto.Target:
        /** Removes any target that already exists */
        if (this.targetPos) {
          const { x, y } = this.targetPos;
          this._mapMatrix()[x][y].type = CellType.Empty;
        }

        currentCell.type = CellType.Target;
        this.targetPos = currentCell.position;
        break;
    }
  }
}

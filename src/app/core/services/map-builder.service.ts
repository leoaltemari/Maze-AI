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

  private mapDimension = 32;
  private sourcePos: Position | undefined;
  private targetPos: Position | undefined;

  constructor(private readonly mapInteractionService: MapInteractionService) {}

  private getCellType({ x, y }: Position): CellType {
    return this._mapMatrix()[x][y].type;
  }

  private updateCellValue({ x, y }: Position, newType: CellType) {
    this._mapMatrix.update((matrix) => {
      matrix[x][y].type = newType;

      return matrix;
    });
  }

  /**
   * Method to fill up the initial map matrix with empty cells.
   * @param dimension number of rows and columns that the map will have (always a quadratic form matrix).
   */
  buildInitialMap(dimension: number): void {
    this.mapDimension = dimension;
    const map: IMap = [];

    for (let i = 0; i < this.mapDimension; i++) {
      map.push([]);
      for (let j = 0; j < this.mapDimension; j++) {
        map[i].push(new Cell(i, j));
      }
    }

    this._mapMatrix.set(map);
  }

  clearAllMapWalls(): void {
    this._mapMatrix.update((mapMatrix) => {
      mapMatrix.forEach((matrixRows) => {
        matrixRows.forEach((cell) => {
          if (cell.type === CellType.Wall) {
            cell.type = CellType.Empty;
          }
        });
      });

      return mapMatrix;
    });
  }

  changeCellTypeOnAction(cellPosition: Position): void {
    switch (this.mapInteractionService.turnCellInto) {
      case TurnCellInto.Wall:
        const newType =
          this.getCellType(cellPosition) === CellType.Wall
            ? CellType.Empty
            : CellType.Wall;
        this.updateCellValue(cellPosition, newType);
        break;

      case TurnCellInto.Source:
        /** Removes any source that already exists */
        if (this.sourcePos) {
          this.updateCellValue(this.sourcePos, CellType.Empty);
        }

        this.updateCellValue(cellPosition, CellType.Source);
        this.sourcePos = cellPosition;
        break;

      case TurnCellInto.Target:
        /** Removes any target that already exists */
        if (this.targetPos) {
          this.updateCellValue(this.targetPos, CellType.Empty);
        }

        this.updateCellValue(cellPosition, CellType.Target);
        this.targetPos = cellPosition;
        break;
    }
  }
}

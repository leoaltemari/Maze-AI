import { Injectable, Signal, signal } from '@angular/core';

import { Cell, CellIcon, CellType, cellTypeToIconMap, IMap, Position, TurnCellInto } from '@models';
import { MapInteractionService } from '@services';

@Injectable()
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
    return this._mapMatrix.asReadonly();
  }
  get mapMatrix(): IMap {
    return this._mapMatrix();
  }
  set mapMatrix(cells: IMap) {
    this._mapMatrix.set(cells);
  }

  private _mapAsStringMatrix: string[][] = [];
  get mapAsStringMatrix(): string[][] {
    return this._mapAsStringMatrix;
  }

  private _mapDimension = 32;
  private _sourcePos: Position | undefined;
  get sourcePos() {
    return this._sourcePos;
  }
  private _targetPos: Position | undefined;
  get targetPos() {
    return this._targetPos;
  }

  isPath = (pos: Position) => this.isFromCellType(pos, CellType.Path);
  isWall = (pos: Position) => this.isFromCellType(pos, CellType.Wall);
  isSource = (pos: Position) => this.isFromCellType(pos, CellType.Source);
  isTarget = (pos: Position) => this.isFromCellType(pos, CellType.Target);

  constructor(private readonly mapInteractionService: MapInteractionService) {}

  private isFromCellType({ x, y }: Position, type: CellType): boolean {
    return this.mapMatrix[x][y].type === type;
  }

  updateCellType({ x, y }: Position, newType: CellType): void {
    this._mapMatrix.update((matrix) => {
      matrix[x][y].type = newType;
      return matrix;
    });

    this._mapAsStringMatrix[x][y] = cellTypeToIconMap[newType];
  }

  /**
   * Method to fill up the initial map matrix with empty cells.
   * @param dimension number of rows and columns that the map will have (always a quadratic form matrix).
   */
  buildMap(dimension?: number): void {
    this._mapDimension = dimension ?? this._mapDimension;
    const map: IMap = [];

    for (let i = 0; i < this._mapDimension; i++) {
      map.push([]);
      this._mapAsStringMatrix.push([]);

      for (let j = 0; j < this._mapDimension; j++) {
        const pos = { x: i, y: j };
        map[i].push(new Cell(pos));
        this._mapAsStringMatrix[i].push(CellIcon.Empty);
      }
    }

    this._mapMatrix.set(map);
  }

  /**
   * Clear all cells from map that are from a certain type.
   * @param type Type of the cell that will be cleard from the map.
   */
  clear(type: CellType): void {
    this._mapMatrix.update((mapMatrix) => {
      mapMatrix.forEach((matrixRows, i) => {
        matrixRows.forEach((cell, j) => {
          if (cell.type === type) {
            cell.type = CellType.Empty;
          }
          this._mapAsStringMatrix[i][j] = CellIcon.Empty;
        });
      });

      return mapMatrix;
    });
  }

  changeCellTypeOnAction(cellPosition: Position): void {
    switch (this.mapInteractionService.turnCellInto) {
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

import { Injectable } from '@angular/core';

import { Algorithms, CellType, Position, SearchAlgorithm } from '@models';
import { AStar } from '@search-algorithms';
import { MapInteractionService } from '@services';

import { MapBuilderService } from './map-builder.service';

const BUILD_PATH_DELAY = 80;
const BUILD_EXPANDED_DELAY = 10;

@Injectable()
export class SearchService {
  /** Used to save the generated path so it can be cleaned on a new run */
  private _generatedPath: Position[] = [];
  private _generatedExpanded: Position[] = [];

  constructor(
    private readonly mapBuilderService: MapBuilderService,
    private readonly mapInteractionService: MapInteractionService,
  ) {}

  private clearPath(): void {
    this._generatedPath.forEach((pathPosition) => {
      if (this.mapBuilderService.isPath(pathPosition)) {
        this.mapBuilderService.updateCellType(pathPosition, CellType.Empty);
      }
    });

    this._generatedPath = [];
  }

  private updateMapWith(cells: Position[], type: CellType) {
    const delay = type === CellType.Path ? BUILD_PATH_DELAY : BUILD_EXPANDED_DELAY;

    cells.forEach((path, i) => {
      setTimeout(() => this.mapBuilderService.updateCellType(path, type), delay * (i + 1));
    });
  }

  runSearchAlgorithm(): void {
    const { selectedAlgorithm } = this.mapInteractionService;
    const { sourcePos, targetPos, mapAsStringMatrix } = this.mapBuilderService;

    let searchAlgoClass!: SearchAlgorithm;

    if (!sourcePos || !targetPos) {
      console.log('No surce or no target was setted');
      return;
    }

    this.clearPath();

    switch (selectedAlgorithm) {
      case Algorithms.Astar:
        searchAlgoClass = new AStar(mapAsStringMatrix, sourcePos, targetPos);
    }

    searchAlgoClass.run();
    this._generatedPath = searchAlgoClass.path;
    this._generatedExpanded = searchAlgoClass.expanded;

    this.updateMapWith(this._generatedExpanded, CellType.Expanded);
    this.updateMapWith(this._generatedPath, CellType.Path);
  }
}

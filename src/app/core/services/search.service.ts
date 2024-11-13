import { inject, Injectable } from '@angular/core';

import { Algorithms, CellType, Position, SearchAlgorithm } from '@models';
import { AStar, BestFS, BFS, DFS, HillClimb, SearchAlgorithmBase } from '@search-algorithms';
import { MazeBuilderService, MazeInteractionService } from '@services';

const BUILD_PATH_DELAY = 80;
const BUILD_EXPANDED_DELAY = 10;

@Injectable()
export class SearchService {
  private readonly mazeBuilderService = inject(MazeBuilderService);
  private readonly mazeInteractionService = inject(MazeInteractionService);

  private _pathGenerationTimeout: ReturnType<typeof setTimeout>[] = [];

  private clearPath(): void {
    this.mazeBuilderService.clear(CellType.Path);
    this.mazeBuilderService.clear(CellType.Expanded);
    this._pathGenerationTimeout.forEach(clearTimeout);
  }

  private updateMazeWith(cells: Position[], type: CellType) {
    const delay = type === CellType.Path ? BUILD_PATH_DELAY : BUILD_EXPANDED_DELAY;

    cells.forEach((path, i) => {
      this._pathGenerationTimeout.push(
        setTimeout(() => this.mazeBuilderService.updateCellType(path, type), delay * (i + 1)),
      );
    });
  }

  private createAlgorithmObject(): SearchAlgorithm | SearchAlgorithmBase {
    const { sourcePos, targetPos, mazeAsStringMatrix } = this.mazeBuilderService;

    switch (this.mazeInteractionService.selectedAlgorithm) {
      case Algorithms.Astar:
        return new AStar(mazeAsStringMatrix, sourcePos!, targetPos!);
      case Algorithms.DFS:
        return new DFS(mazeAsStringMatrix, sourcePos!);
      case Algorithms.BFS:
        return new BFS(mazeAsStringMatrix, sourcePos!);
      case Algorithms.BestFS:
        return new BestFS(mazeAsStringMatrix, sourcePos!, targetPos!);
      case Algorithms.HillClimb:
        return new HillClimb(mazeAsStringMatrix, sourcePos!, targetPos!);
      default:
        return new SearchAlgorithmBase(mazeAsStringMatrix, sourcePos!);
    }
  }

  runSearchAlgorithm(): void {
    this.clearPath();

    const { sourcePos, targetPos } = this.mazeBuilderService;

    if (!sourcePos || !targetPos) {
      console.log('No surce or no target was setted');
      return;
    }

    const searchAlgoClass = this.createAlgorithmObject();
    searchAlgoClass.run();

    this.updateMazeWith(searchAlgoClass.expanded, CellType.Expanded);
    this.updateMazeWith(searchAlgoClass.path, CellType.Path);
  }
}

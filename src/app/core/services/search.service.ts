import { inject, Injectable } from '@angular/core';

import { AlgorithmObj, Algorithms, CellType, Position } from '@models';
import { AStar, BestFS, BFS, DFS, HillClimb } from '@search-algorithms';
import { MazeBuilderService, MazeInteractionService } from '@services';

@Injectable()
export class SearchService {
  private readonly mazeBuilderService = inject(MazeBuilderService);
  private readonly mazeInteractionService = inject(MazeInteractionService);

  private readonly BUILD_EXPANDED_DELAY = 30;

  private _pathGenerationTimeout: ReturnType<typeof setTimeout>[] = [];

  /**
   * Updates the maze cells that are passed as parametter with the cell type selected.
   *
   * @param cells {x, y} pair array containing the cells that will be changed into the new type.
   * @param type Path or Expanded type to updade the cells.
   */
  private updateMazeWith(
    cells: Position[],
    type: CellType.Path | CellType.Expanded,
    offset = 0,
  ): void {
    cells.forEach((path, i) => {
      this._pathGenerationTimeout.push(
        setTimeout(
          () => this.mazeBuilderService.updateCellType(path, type),
          this.BUILD_EXPANDED_DELAY * (offset + i + 1),
        ),
      );
    });
  }

  private searchAlgorithmFactory(): AlgorithmObj {
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
    }
  }

  runSearchAlgorithm(): void {
    /** Clear maze */
    this.mazeBuilderService.clear(CellType.Path);
    this.mazeBuilderService.clear(CellType.Expanded);
    this._pathGenerationTimeout.forEach(clearTimeout);

    const { sourcePos, targetPos } = this.mazeBuilderService;

    if (!sourcePos || !targetPos) {
      console.log('No surce or no target was setted');
      return;
    }

    const searchAlgorithm: AlgorithmObj = this.searchAlgorithmFactory();
    searchAlgorithm.run();

    this.updateMazeWith(searchAlgorithm.expanded, CellType.Expanded);
    this.updateMazeWith(searchAlgorithm.path, CellType.Path, searchAlgorithm.expanded.length);
  }
}

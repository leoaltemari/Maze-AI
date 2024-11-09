import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Algorithms, TurnCellInto } from '@models';
import { MapBuilderService, MapInteractionService, SearchService } from '@services';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  providers: [SearchService],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  private readonly mapInteractionService = inject(MapInteractionService);
  private readonly mapBuilderService = inject(MapBuilderService);
  private readonly searchService = inject(SearchService);

  protected readonly turnCellIntoOptions = [
    { label: 'Wall', value: TurnCellInto.Wall },
    { label: 'Source', value: TurnCellInto.Source },
    { label: 'Target', value: TurnCellInto.Target },
  ];

  protected readonly algorithmList = Object.values(Algorithms);
  protected algorithmListExpanded = true;
  protected selectedAlgorithm = this.mapInteractionService.selectedAlgorithmAsSignal;

  turnCellInto(value: TurnCellInto): void {
    this.mapInteractionService.turnCellInto = value;
  }

  selectAlgorithm(option: string): void {
    const optionToAlgoMap: { [key: string]: Algorithms } = {
      'A*': Algorithms.Astar,
      BFS: Algorithms.BFS,
      DFS: Algorithms.DFS,
      BestFS: Algorithms.BestFS,
      HillClimb: Algorithms.HillClimb,
    };

    this.mapInteractionService.selectedAlgorithm = optionToAlgoMap[option];
  }

  clearWallsOnClick(): void {
    this.mapBuilderService.clearAllMapWalls();
  }

  runSearchAlgorithm() {
    this.searchService.runSearchAlgorithm();
  }
}

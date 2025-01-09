import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Algorithms, CellType, TurnCellInto } from '@models';
import { MazeBuilderService, MazeInteractionService, SearchService } from '@services';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  providers: [SearchService],
  host: {
    class: 'p-4 bg-grey-4',
  },
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  private readonly mazeInteractionService = inject(MazeInteractionService);
  private readonly mazeBuilderService = inject(MazeBuilderService);
  private readonly searchService = inject(SearchService);

  protected readonly algorithmList = Object.values(Algorithms);
  protected algorithmListExpanded = true;
  protected selectedAlgorithm = this.mazeInteractionService.selectedAlgorithmAsSignal;

  protected readonly turnCellIntoOptions = [
    { label: 'Wall', value: TurnCellInto.Wall },
    { label: 'Source', value: TurnCellInto.Source },
    { label: 'Target', value: TurnCellInto.Target },
  ];

  protected clearWalls: VoidFunction = () => this.mazeBuilderService.clear(CellType.Wall);
  protected clearPath: VoidFunction = () => {
    this.mazeBuilderService.clear(CellType.Path);
    this.mazeBuilderService.clear(CellType.Expanded);
  };
  protected clearAll: VoidFunction = () => this.mazeBuilderService.clearMaze();

  selectTurnCellInto(option: TurnCellInto): void {
    this.mazeInteractionService.turnCellInto = option;
  }

  selectAlgorithm(option: string): void {
    const optionToAlgoMap: Record<string, Algorithms> = {
      'A*': Algorithms.Astar,
      BFS: Algorithms.BFS,
      DFS: Algorithms.DFS,
      'Best First Search': Algorithms.BestFS,
      HillClimb: Algorithms.HillClimb,
    };

    this.mazeInteractionService.selectedAlgorithm = optionToAlgoMap[option];
  }

  runSearchAlgorithm(): void {
    this.searchService.runSearchAlgorithm();
  }
}

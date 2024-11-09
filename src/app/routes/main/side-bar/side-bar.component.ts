import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Algorithms, TurnCellInto } from '@models';
import { MapBuilderService, MapInteractionService } from '@services';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  protected readonly turnCellIntoOptions = [
    { label: 'Wall', value: TurnCellInto.Wall },
    { label: 'Target', value: TurnCellInto.Target },
    { label: 'Source', value: TurnCellInto.Source },
  ];

  protected readonly algorithmList = Object.values(Algorithms);
  protected algorithmListExpanded = true;
  protected selectedAlgorithm: Algorithms | undefined;

  constructor(
    private readonly mapInteractionService: MapInteractionService,
    private readonly mapBuilderService: MapBuilderService,
  ) {}

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

    this.selectedAlgorithm = optionToAlgoMap[option];
  }

  clearWallsOnClick(): void {
    this.mapBuilderService.clearAllMapWalls();
  }
}

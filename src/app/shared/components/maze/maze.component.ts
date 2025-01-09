import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { CellComponent } from '@components/cell/cell.component';
import { Position } from '@models';
import { MazeBuilderService, MazeInteractionService } from '@services';

@Component({
  selector: 'app-maze',
  standalone: true,
  imports: [CommonModule, CellComponent],
  host: {
    class: 'w-100 h-100 pb-4 bg-grey-3 centered-items',
  },
  templateUrl: './maze.component.html',
  styleUrl: './maze.component.scss',
})
export class MazeComponent implements OnInit {
  /**
   * Sets the number of cells the maze will have on the rows and columns.
   *
   * @example
   * A dimension of 5 means that the maze will have 5 rows with 5 cells each (total of 25 cells),
   * as a matrix [5]x[5].
   *
   * @default 16
   * */
  readonly dimension = input(16, { alias: 'size' });

  private readonly mazeBuilderService = inject(MazeBuilderService);
  private readonly mazeInteractionService = inject(MazeInteractionService);

  protected readonly mazeCells = this.mazeBuilderService.mazeMatrixAsSignal;

  ngOnInit(): void {
    this.mazeBuilderService.buildMaze(this.dimension());
  }

  changeCellType(position: Position): void {
    this.mazeBuilderService.turnCellInto(position, this.mazeInteractionService.turnCellInto);
  }
}

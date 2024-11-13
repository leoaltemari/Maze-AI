import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { CellComponent } from '@components/cell/cell.component';
import { Position } from '@models';
import { MazeBuilderService } from '@services';

@Component({
  selector: 'app-maze',
  standalone: true,
  imports: [CommonModule, CellComponent],
  host: {
    class: 'w-100 h-100 bg-grey-3 centered-items',
  },
  templateUrl: './maze.component.html',
})
export class MazeComponent implements OnInit {
  /**
   * Dimension sets the number of cells the maze will have on the rows and columns.
   * @example
   * A dimension of 5 means that the maze will have 5 rows with 5 cells each (total of 25 cells),
   * as a matrix [5]x[5].
   * */
  readonly dimension = input(32, { alias: 'size' });

  private readonly mazeBuilderService = inject(MazeBuilderService);

  protected readonly mazeCells = this.mazeBuilderService.mazeMatrixAsSignal;

  ngOnInit(): void {
    this.mazeBuilderService.buildMaze(this.dimension());
  }

  changeCellType(position: Position): void {
    this.mazeBuilderService.changeCellTypeOnAction(position);
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

import { CellComponent } from '@components/cell/cell.component';
import { Position } from '@models';
import { MapBuilderService } from '@services';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, CellComponent],
  host: {
    class: 'w-100 h-100 bg-grey-3 centered-items',
  },
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  /**
   * Dimension sets the number of cells the map will have on the rows and columns.
   * A dimension of 5 means that the map will have 5 rows with 5 cells each (total of 25 cells),
   * as a matrix [5]x[5].
   * */
  @Input() dimension = 32;

  private readonly mapBuilderService = inject(MapBuilderService);

  protected readonly mapCells = this.mapBuilderService.mapMatrixAsSignal;

  ngOnInit(): void {
    this.mapBuilderService.buildInitialMap(this.dimension);
  }

  changeCellType(position: Position): void {
    this.mapBuilderService.changeCellTypeOnAction(position);
  }
}

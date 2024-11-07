import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { CellComponent } from '@components/cell/cell.component';
import { MapInteractionService, MapBuilderService } from '@services';
import { IMap } from '@models';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  /**
   * Dimension sets the number of cells the map will have on the rows and columns.
   * A dimension of 5 means that the map will have 5 rows with 5 cells each (total of 25 cells),
   * as a matrix 5x5.
   * */
  @Input() dimension = 5;

  mapCells: IMap | undefined;

  constructor(
    private readonly mapInteractionService: MapInteractionService,
    private readonly mapBuilderService: MapBuilderService,
  ) {}

  ngOnInit(): void {
    this.mapBuilderService.buildInitialMapMatrix(this.dimension);
    this.mapBuilderService.buildMapObjectFromMatrix();

    this.mapCells = this.mapBuilderService.mapCells;
  }
}

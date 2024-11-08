import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Signal, signal } from '@angular/core';

import { CellComponent } from '@components/cell/cell.component';
import { IMap, Position } from '@models';
import { MapBuilderService } from '@services';


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
   * as a matrix [5]x[5].
   * */
  @Input() dimension = 32;

  mapCells: Signal<IMap> = signal([]);

  constructor(private readonly mapBuilderService: MapBuilderService) {}

  ngOnInit(): void {
    this.startMap();
  }

  private startMap(): void {
    this.mapBuilderService.buildInitialMap(this.dimension);
    this.mapCells = this.mapBuilderService.mapMatrixAsSignal;
  }

  changeCellType(position: Position): void {
    this.mapBuilderService.changeCellTypeOnAction(position);
  }
}

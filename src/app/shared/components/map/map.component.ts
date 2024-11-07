import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { CellComponent } from '@components/cell/cell.component';
import { Cell, Map, MapRow } from '@models';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  @Input() dimension = 5;

  mapCells: Map = {
    rows: []
  };

  ngOnInit(): void {
    this.buildMap();
  }

  private buildMap(): void {
    for (let i = 0; i < this.dimension; i++) {
      const row: MapRow = {
        id: i.toString(),
        cells: [],
      }

      for (let j = 0; j < this.dimension; j++) {
        row.cells.push({id: i.toString() + j.toString(), cell: new Cell(i, j)});
      }

      this.mapCells.rows?.push(row);
    }
  }
}

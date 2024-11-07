import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

import { CellComponent } from "@components/cell/cell.component";
import { Cell, Map, MapRow } from "@models";

@Component({
  selector: "app-map",
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.scss",
})
export class MapComponent implements OnInit {
  /**
   * Dimension sets the number of cells the map will have on the rows and columns.
   * A dimension of 5 means that the map will have 5 rows with 5 cells each (total of 25 cells),
   * as a matrix 5x5.
   * */
  @Input() dimension = 5;

  mapCells: Map = {
    rows: [],
  };

  ngOnInit(): void {
    this.buildMap();
  }

  private buildMap(): void {
    /** Creates all map rows */
    for (let i = 0; i < this.dimension; i++) {
      const row: MapRow = {
        id: i.toString(),
        cells: [],
      };

      /** Creates each cell of the row 'i' */
      for (let j = 0; j < this.dimension; j++) {
        row.cells.push({
          id: i.toString() + j.toString(),
          cell: new Cell(i, j),
        });
      }

      this.mapCells.rows?.push(row);
    }
  }
}

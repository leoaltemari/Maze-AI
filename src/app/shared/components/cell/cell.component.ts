import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Cell, CellType } from '@models';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent implements Cell {
  @Input({ required: true }) type: CellType = CellType.Empty;
  @Input() x: number | undefined;
  @Input() y: number | undefined;

  public readonly cellTypeEnum = CellType;

}

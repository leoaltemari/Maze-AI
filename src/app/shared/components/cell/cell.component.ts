import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';

import { CellType, Position } from '@models';


@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  @Input({ required: true }) type: CellType = CellType.Empty;
  @Input() position: Position = { x: 0, y: 0 };

  cellOnClick = output<Position>();

  readonly cellTypeEnum = CellType;
}

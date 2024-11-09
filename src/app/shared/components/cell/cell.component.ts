import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
} from '@angular/core';

import { CellType, Position } from '@models';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  @Input({ required: true }) type!: CellType;
  @Input({ required: true }) position!: Position;

  protected readonly cellOnClick = output<Position>();
  protected readonly cellTypeEnum = CellType;
}

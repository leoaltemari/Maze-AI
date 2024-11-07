import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Cell, CellActions, CellType, Position } from '@models';
import { MapInteractionService } from '@services';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent implements Cell {
  @Input({ required: true }) type: CellType = CellType.Empty;
  @Input() position: Position = { x: 0, y: 0 };

  public readonly cellTypeEnum = CellType;

  constructor(private readonly mapInteractionService: MapInteractionService) {}

  private getNewCellType(): CellType {
    switch (this.mapInteractionService.currentCellAction) {
      case CellActions.Source:
        break;

      default:
        break;
    }
    return CellType.Empty;
  }

  onCellClick(): void {
    this.type = this.getNewCellType();
  }
}

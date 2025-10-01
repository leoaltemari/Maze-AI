import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { CellType, Position, typeToBackgroundColorMap } from '@models';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="cell"
      title="{{ position().x }} , {{ position().y }}"
      [ngClass]="backgroundClass()"
      (click)="cellOnClick.emit(position())"
    ></div>
  `,
})
export class CellComponent {
  readonly type = input.required<CellType>();
  readonly position = input.required<Position>();

  protected readonly cellOnClick = output<Position>();

  protected readonly backgroundClass = computed(() => typeToBackgroundColorMap[this.type()]);
}

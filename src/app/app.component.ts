import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CellComponent } from '@components/cell/cell.component';
import { MapComponent } from '@components/map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CellComponent, MapComponent],
  host: {
    class: 'bg-grey-3',
  },
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

import { CellType } from './shared/models/cell.model';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CellComponent } from './shared/components/cell/cell.component';
import { MapComponent } from '@components/map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CellComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  CellType = CellType;
}

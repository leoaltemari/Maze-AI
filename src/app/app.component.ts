import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CellComponent } from '@components/cell/cell.component';

import { MainComponent } from './routes/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CellComponent, MainComponent],
  template: '<app-main></app-main>',
})
export class AppComponent {}

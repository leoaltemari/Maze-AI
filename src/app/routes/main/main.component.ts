import { Component } from '@angular/core';

import { MapComponent } from '@components/map/map.component';

import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SideBarComponent, MapComponent],
  host: {
    class: 'd-flex',
  },
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}

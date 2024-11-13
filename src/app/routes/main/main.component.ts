import { Component } from '@angular/core';

import { MazeComponent } from '@components/maze/maze.component';
import { MazeBuilderService } from '@services';

import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SideBarComponent, MazeComponent],
  providers: [MazeBuilderService],
  host: {
    class: 'd-flex',
  },
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}

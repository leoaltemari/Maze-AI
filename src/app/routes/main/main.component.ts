import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MazeComponent } from '@components/maze/maze.component';
import { CellType, typeToBackgroundColorMap } from '@models';
import { MazeBuilderService } from '@services';

import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, SideBarComponent, MazeComponent],
  providers: [MazeBuilderService],
  host: {
    class: 'd-flex',
  },
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  protected readonly legendItems = [
    { label: 'Empty', color: typeToBackgroundColorMap[CellType.Empty] },
    { label: 'Wall', color: typeToBackgroundColorMap[CellType.Wall] },
    { label: 'Source', color: typeToBackgroundColorMap[CellType.Source] },
    { label: 'Target', color: typeToBackgroundColorMap[CellType.Target] },
    { label: 'Path', color: typeToBackgroundColorMap[CellType.Path] },
    { label: 'Expanded', color: typeToBackgroundColorMap[CellType.Expanded] },
  ];
}

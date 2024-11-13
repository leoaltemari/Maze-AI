import { TestBed } from '@angular/core/testing';

import { MazeBuilderService } from './maze-builder.service';

describe('MazeBuilderService', () => {
  let service: MazeBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazeBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

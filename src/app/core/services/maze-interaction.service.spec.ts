import { TestBed } from '@angular/core/testing';

import { MazeInteractionService } from './maze-interaction.service';

describe('MazeInteractionService', () => {
  let service: MazeInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazeInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

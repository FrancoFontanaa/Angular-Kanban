import { TestBed } from '@angular/core/testing';

import { BoardsManagerService } from './boards-manager.service';

describe('BoardsManagerService', () => {
  let service: BoardsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

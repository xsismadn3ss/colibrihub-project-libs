import { TestBed } from '@angular/core/testing';

import { SessionSignalService } from './session-signal.service';

describe('SessionSignalService', () => {
  let service: SessionSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

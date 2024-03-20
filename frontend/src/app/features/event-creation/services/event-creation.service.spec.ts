import { TestBed } from '@angular/core/testing';

import { EventCreationService } from './event-creation.service';

describe('EventCreationService', () => {
  let service: EventCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

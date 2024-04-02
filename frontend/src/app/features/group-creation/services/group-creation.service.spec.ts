import { TestBed } from '@angular/core/testing';

import { GroupCreationService } from './group-creation.service';

describe('GroupCreationService', () => {
  let service: GroupCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

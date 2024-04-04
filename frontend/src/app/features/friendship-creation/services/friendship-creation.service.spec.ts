import { TestBed } from '@angular/core/testing';

import { FriendshipCreationService } from './friendship-creation.service';

describe('FriendshipCreationService', () => {
  let service: FriendshipCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendshipCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

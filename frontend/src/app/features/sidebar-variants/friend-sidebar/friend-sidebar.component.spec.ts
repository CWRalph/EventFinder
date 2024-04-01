import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSidebarComponent } from './friend-sidebar.component';

describe('FriendSidebarComponent', () => {
  let component: FriendSidebarComponent;
  let fixture: ComponentFixture<FriendSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

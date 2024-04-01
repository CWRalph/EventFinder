import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSidebarComponent } from './group-sidebar.component';

describe('GroupSidebarComponent', () => {
  let component: GroupSidebarComponent;
  let fixture: ComponentFixture<GroupSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

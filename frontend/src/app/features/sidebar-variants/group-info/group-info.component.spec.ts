import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInfoComponent } from './group-info.component';

describe('GroupInfoComponent', () => {
  let component: GroupInfoComponent;
  let fixture: ComponentFixture<GroupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

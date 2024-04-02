import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSidebarComponent } from './membership-sidebar.component';

describe('MembershipSidebarComponent', () => {
  let component: MembershipSidebarComponent;
  let fixture: ComponentFixture<MembershipSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

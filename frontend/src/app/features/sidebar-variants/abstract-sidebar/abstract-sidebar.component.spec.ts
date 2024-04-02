import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractSidebarComponent } from './abstract-sidebar.component';

describe('AbstractSidebarComponent', () => {
  let component: AbstractSidebarComponent;
  let fixture: ComponentFixture<AbstractSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbstractSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

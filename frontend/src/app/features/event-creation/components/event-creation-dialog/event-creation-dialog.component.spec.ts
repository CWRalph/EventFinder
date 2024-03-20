import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreationDialogComponent } from './event-creation-dialog.component';

describe('EventCreationDialogComponent', () => {
  let component: EventCreationDialogComponent;
  let fixture: ComponentFixture<EventCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCreationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

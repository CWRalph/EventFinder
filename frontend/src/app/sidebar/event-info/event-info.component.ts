import { Component, Input } from '@angular/core';
import { Event } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent {
  @Input() event: any;

  constructor() {

  }

}

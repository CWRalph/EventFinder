import {Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { Event } from '@core/models/event';
import {Store} from "@ngrx/store";
import {EventActions} from "@state/event/eventActions";
import {EventCreationService} from "@features/event-creation/services/event-creation.service";
import {selectEvents} from "@state/event/eventReducer";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html',
  standalone: true,
  styleUrl: 'map.component.css',
})
export class MapComponent implements OnInit, OnChanges {
  @ViewChild('eventMap') mapElement!: ElementRef;
  @Input() events: Event[] = [];
  private map!: L.Map;
  private markers: L.Marker[] = [];

  //Variables for location listening
  private isListeningForLocation = false;

  constructor(
    private store:Store,
    private eventCreationService: EventCreationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initializeMap();

    //Subscribe to location listener to select location from map
    this.eventCreationService.locationListener.subscribe(
      (isListening) => {
        this.isListeningForLocation = isListening;
        this.updateMapZIndex(isListening ? 'front' : 'back');
      });

    this.store.select(selectEvents).subscribe(
      (events:Event[])=>this.events = events
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.updateMarkers();
    }
  }

  private initializeMap(): void {
    this.map = L.map('eventMap').setView([49.2, -123], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 14,
        minZoom: 3,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
          'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(this.map);

    this.map.zoomControl.remove();

    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    this.map.on("click", e => {
      this.onLocationClick(e);
    });
  }

  private clearMarkers(): void {
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  private updateMarkers(): void {
    this.clearMarkers();
    this.events.forEach((event) => {
      const marker = L.marker([
        event?.coordinates?.x??0,
        event?.coordinates?.y??0,
      ]).bindPopup(`${event.name} - ${event.eventType}`);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  private onLocationClick(event:any){
    if(this.isListeningForLocation){
      this.store.dispatch(EventActions.selectLocationFromMap({location: {y: event.latlng.lng, x: event.latlng.lat}}));
    }
  }

  private updateMapZIndex(status:'front'|'back'){
    if(this.mapElement){
      const zIndex = status === 'front' ? 10 : 0;
      this.renderer.setStyle(this.mapElement.nativeElement, 'z-index', zIndex);
    }
  }
}

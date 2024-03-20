import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { Event } from '@core/models/event';

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
  @Input() events: Event[] = [];
  private map!: L.Map;
  private markers: L.Marker[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.updateMarkers();
    }
  }

  private initializeMap(): void {
    this.map = L.map('mapId').setView([49.2, -123], 11);
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

    this.initializeClickEvents();
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
        event.coordinates.x,
        event.coordinates.y,
      ]).bindPopup(`${event.name} - ${event.eventType}`);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  private initializeClickEvents(){
    this.map.on("click", e => {
      console.log("ADDING MARKER",e.latlng); // get the coordinates
    });
  }
}

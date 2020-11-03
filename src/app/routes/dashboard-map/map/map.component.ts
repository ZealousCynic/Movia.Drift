import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
//import 'leaflet-routing-machine';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class DashboardMapMapComponent implements AfterViewInit {
  private map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}

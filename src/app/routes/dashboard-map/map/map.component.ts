import { mapRoute } from './../../../../domain/entity/map';
import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class DashboardMapMapComponent implements AfterViewInit {
  @Input() busRoutes: Array<mapRoute>;
  private map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [55.446944, 11.700770],
      zoomControl: false,
      zoom: 9
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    if (this.busRoutes !== undefined) {
      this.busRoutes.forEach(busRoute => {
        // create waypoins
        let wayPoints: Array<L.latLng>;
        busRoute.routeCordinates.forEach(cordinate => {
          wayPoints.push(L.latLng(cordinate.latitude, cordinate.longitude));
        });

        console.log(wayPoints);

        // set waypoints
        L.Routing.control({
          waypoints: [
            wayPoints
          ]
        }
        ).addTo(this.map);

      });
    }
  }
}

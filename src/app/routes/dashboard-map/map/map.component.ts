import { ReturnRouteBusStopDto, ReturnBusStopWithOrderDto } from './../../../../domain/entity/route';
import { mapRoute, LatLon } from './../../../../domain/entity/map';
import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class DashboardMapMapComponent implements AfterViewInit {
  @Input() busRoutes: Array<ReturnBusStopWithOrderDto>;
  private map;
  private routingControl: L.Routing.control;


  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges() {
    if (this.busRoutes !== undefined)
      this.changeMapRoute();
  }

  changeMapRoute() {
    let waypoints = new Array<L.latlng>();

    this.busRoutes.forEach(routePoint => {
      waypoints.push(L.latLng(routePoint.busStop.longitude, routePoint.busStop.latitude));
    });

    console.log(waypoints);
    this.addRoutingControl(waypoints);
  }

  addRoutingControl(waypoints) {
    if (this.routingControl != null)
      this.removeRoutingControl();

    this.routingControl = L.Routing.control({
      waypoints: waypoints
    }).addTo(this.map);
  }

  removeRoutingControl() {
    if (this.routingControl != null) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }
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
  }
}

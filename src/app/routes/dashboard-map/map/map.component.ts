import { ReturnRouteBusStopDto, ReturnBusStopWithOrderDto } from './../../../../domain/entity/route';
import { mapRoute, LatLon } from './../../../../domain/entity/map';
import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class DashboardMapMapComponent implements AfterViewInit {
  @Input() busRoutes: Array<ReturnBusStopWithOrderDto>;
  private map: L.Map;
  private routingControl: L.Routing.control;

  @ViewChild('map') mapElement: ElementRef;



  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  // binding on input change to make it dynamic
  ngOnChanges() {
    if (this.busRoutes !== undefined)
      this.changeMapRoute();
  }

  ngOnDestroy(): void{
    this.map.remove();
  }

  changeMapRoute() {
    let waypoints = new Array<L.latlng>();

    // get waypoints from route
    this.busRoutes.forEach(routePoint => {
      waypoints.push(L.latLng(routePoint.busStop.longitude, routePoint.busStop.latitude));
    });

    console.log(waypoints);
    this.addRoutingControl(waypoints);
  }

  // add new route to map
  addRoutingControl(waypoints) {
    if (this.routingControl != null)
      this.removeRoutingControl();

    // set new waypoint for map
    this.routingControl = L.Routing.control({
      waypoints: waypoints,
      draggableWaypoints: false,
      addWaypoints: false
    }).addTo(this.map);
  }

  // remove current route
  removeRoutingControl() {
    if (this.routingControl != null) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }
  }



  private initMap(): void {
    // custom icons sexy right??
    L.Icon.Default.prototype.options.iconUrl = 'assets/images/map/marker-icon.png';
    L.Icon.Default.prototype.options.iconRetinaUrl = 'assets/images/map/marker-icon-x2.png';
    L.Icon.Default.prototype.options.shadowUrl = 'assets/images/map/marker-shadow.png';

    // set up inital map
    this.map = L.map('map', {
      center: [55.446944, 11.700770],
      zoomControl: false,
      zoom: 9
    });

    // set map tiles from openstreet map
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
}

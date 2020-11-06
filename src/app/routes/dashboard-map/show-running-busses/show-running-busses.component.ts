import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { RunningBus } from 'domain/entity/map';
import { ReturnBusStopWithOrderDto } from 'domain/index';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-dashboard-map-show-running-busses',
  templateUrl: './show-running-busses.component.html',
  styleUrls: ['./show-running-busses.component.scss']
})
export class DashboardMapShowRunningBussesComponent implements OnInit, AfterViewInit {
  runningBusses: Array<RunningBus>;
  selectedRunningBus: RunningBus;
  private map;
  marker = new Array<L.marker>();

  constructor(
    private mapRepositoryService: MapRepositoryService
  ) { }
  ngAfterViewInit(): void {
    this.getBusses();
  }

  ngOnInit() {
    this.initMap();
  }

  busIcon = L.icon({
    iconUrl: 'assets/images/map/marker-bus-icon.png',
    shadowUrl: 'assets/images/map/marker-shadow.png',

    iconSize: [34, 54], // size of the icon
    shadowSize: [25, 41], // size of the shadow
    iconAnchor: [17, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 40],  // the same for the shadow
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
  });

  // update to get all running busses and there current passengers
  getBusses() {
    console.log("test");
    this.mapRepositoryService.getRunningBusses().subscribe(res => {
      this.runningBusses = res;
      this.changeMapRunningBusses();
    },
      err => {
        console.log(err);
      });
  }

  changeMapRunningBusses() {
    for (let i = 0; i < this.runningBusses.length; i++) {
      const element = this.runningBusses[i];

      var LamMarker = new L.marker([element.longitude, element.latitude], { icon: this.busIcon });
      //var LamMarker = new L.marker([element.latitude, element.longitude]); 
      this.marker.push(LamMarker);
      this.marker[i].addTo(this.map)
      .bindPopup('<b>' + element.busDriver.firstName + ' ' + element.busDriver.lastName + '</b><br>Route ID ' + element.routeID + '<br>Bus Registration ' + element.bus.registrationNumber)
      .on("click", () => {
        this.markerOnClick(element.id);
    });
      console.log(element);
    }
  }


  markerDelAgain() {
    for (let i = 0; i < this.marker.length; i++) {
      this.map.removeLayer(this.marker[i]);
    }
  }

  markerOnClick(id) {
    //console.log(e);
    console.log(id);
    let bus = this.runningBusses.find(element => element.id == id);

    if (bus !== undefined){
      this.selectedRunningBus = bus;
    }
  }

  private initMap(): void {
    // custom icons sexy right??
    L.Icon.Default.prototype.options.iconUrl = 'assets/images/map/map-marker-small-busstop.svg';
    L.Icon.Default.prototype.options.iconRetinaUrl = 'assets/images/map/map-marker-small-busstop.svg';
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

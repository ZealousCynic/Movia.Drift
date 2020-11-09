import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { RunningBus } from 'domain/entity/map';
import { ReturnBusStopWithOrderDto } from 'domain/index';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { element } from 'protractor';

export interface BusMarker {
  bus: RunningBus;
  marker: L.marker;
}

@Component({
  selector: 'app-dashboard-map-show-running-busses',
  templateUrl: './show-running-busses.component.html',
  styleUrls: ['./show-running-busses.component.scss']
})

export class DashboardMapShowRunningBussesComponent implements OnInit, AfterViewInit {
  runningBusses: Array<RunningBus>;
  selectedRunningBus: RunningBus;
  private map;
  marker = new Array<BusMarker>();

  constructor(
    private mapRepositoryService: MapRepositoryService
  ) { }
  ngAfterViewInit(): void {
    this.getBusses();
  }

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges() {
    this.changeMapRunningBusses(this.runningBusses);
  }
  // update to get all running busses and there current passengers
  getBusses() {
    this.mapRepositoryService.getRunningBusses().subscribe(res => {
      this.runningBusses = res;

      console.log(res);

      // get passenger information
      this.runningBusses.forEach(runningBus => {
        this.mapRepositoryService.getRunningBusPassengers(runningBus.bus.registrationNumber).subscribe(res => {
          // set the passenger information
          runningBus.passengers = res;
          console.log();
        });
      });

      this.changeMapRunningBusses(this.runningBusses);
    },
      err => {
        console.log(err);
      });
  }

  changeMapRunningBusses(runningBusses:Array<RunningBus>) {
    for (let i = 0; i < runningBusses.length; i++) {
      const element = runningBusses[i];

      // check if marker exsists
      // if not create if it does exsists update marker and override

      var updateBus = this.marker.find(marker => marker.bus.id == element.id);

      if (updateBus != undefined) {
        // update current marker
        updateBus.marker.setIcon()
      } else {
        // create new marker
        this.marker.push({ bus: element, marker: this.createMarker(element) });
        let popupMessage = '<b>' + element.busDriver.firstName + ' ' + element.busDriver.lastName + '</b><br>Route ID ' + element.routeID + '<br>Bus Registration ' + element.bus.registrationNumber;

        this.marker[i].marker.addTo(this.map)
          .bindPopup(popupMessage)
          .on("click", () => {
            this.markerOnClick(element.id);
          });
      }

    }
  }

  createMarker(runningBus: RunningBus): L.marker {
    var marker;
    console.log("test see me" + runningBus.id);
    console.log(runningBus.passengers != undefined);
    if (runningBus.passengers != undefined) {
      var currentPassenger = runningBus.passengers.total;
      var maxAllowed = runningBus.bus.seatingPlace + runningBus.bus.standingPlace;

      var temp = currentPassenger / maxAllowed;
      console.log(temp);
      if (temp >= 75) {
        marker = new L.marker([runningBus.longitude, runningBus.latitude], { icon: this.busIconDanger });
      } else if (temp >= 50) {
        marker = new L.marker([runningBus.longitude, runningBus.latitude], { icon: this.busIconWarning });
      } else {
        marker = new L.marker([runningBus.longitude, runningBus.latitude], { icon: this.busIcon });
      }
    } else {
      marker = new L.marker([runningBus.longitude, runningBus.latitude], { icon: this.busIconUnknown });
    }
    return marker;
  }

  // remove marker
  markerDelAgain() {
    for (let i = 0; i < this.marker.length; i++) {
      this.map.removeLayer(this.marker[i]);
    }
  }

  // click on marker
  markerOnClick(id) {
    console.log(id);
    let bus = this.runningBusses.find(element => element.id == id);

    if (bus !== undefined) {
      this.selectedRunningBus = bus;
    }
  }

  // make marker
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


  // custom maker
  busIcon = L.icon({
    iconUrl: 'assets/images/map/marker-bus-icon.png',
    shadowUrl: 'assets/images/map/marker-shadow.png',

    iconSize: [34, 54], // size of the icon
    shadowSize: [25, 41], // size of the shadow
    iconAnchor: [17, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 40],  // the same for the shadow
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
  });


  // custom maker
  busIconDanger = L.icon({
    iconUrl: 'assets/images/map/marker-bus-icon-danger.png',
    shadowUrl: 'assets/images/map/marker-shadow.png',

    iconSize: [34, 54], // size of the icon
    shadowSize: [25, 41], // size of the shadow
    iconAnchor: [17, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 40],  // the same for the shadow
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
  });


  // custom maker
  busIconUnknown = L.icon({
    iconUrl: 'assets/images/map/marker-bus-icon-unknown.png',
    shadowUrl: 'assets/images/map/marker-shadow.png',

    iconSize: [34, 54], // size of the icon
    shadowSize: [25, 41], // size of the shadow
    iconAnchor: [17, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 40],  // the same for the shadow
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
  });

  busIconWarning = L.icon({
    iconUrl: 'assets/images/map/marker-bus-icon-warning.png',
    shadowUrl: 'assets/images/map/marker-shadow.png',

    iconSize: [34, 54], // size of the icon
    shadowSize: [25, 41], // size of the shadow
    iconAnchor: [17, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 40],  // the same for the shadow
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
  });
}

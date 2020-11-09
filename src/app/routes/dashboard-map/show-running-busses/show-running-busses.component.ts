import { Passengers, RunningBus } from './../../../../domain/entity/map';
import { mergeMap } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ReturnBusStopWithOrderDto } from 'domain/index';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import { request } from 'http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { element } from 'protractor';
import { concat, forkJoin, interval, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

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
  //runningBusses: Array<RunningBus>;
  selectedRunningBus: RunningBus;
  private map;
  marker = new Array<BusMarker>();
  subscription: Subscription;
  source = interval(2000);
  


  constructor(
    private mapRepositoryService: MapRepositoryService
  ) { }
  async ngAfterViewInit(): Promise<void> {
    //this.getBusses();
    
  }

  ngOnInit() {
    this.initMap();
    this.subscription = this.source.subscribe(val => this.getBusses());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges() {
    this.getBusses();
  }
  // update to get all running busses and there current passengers
  getBusses() {
    this.mapRepositoryService.getRunningBusses().toPromise().then(res => {
      res.forEach(runningBus => {
        this.mapRepositoryService.getRunningBusPassengers(runningBus.bus.registrationNumber).toPromise()
          .then(
            val => {
              runningBus.passengers = val;
            }
          ).catch(
            err => {
              //console.log(err);
              runningBus.passengers = undefined;
            }
          ).finally(() => {
            this.setMarker(runningBus);
        });
      });
    }, err => {
      console.log(err);
    });
  }



  setMarker(runningBusses: RunningBus) {


    // check if marker exsists
    // if not create if it does exsists update marker and override

    var updateBus = this.marker.find(marker => marker.bus.id == runningBusses.id);

    if (updateBus != undefined) {
      // update current marker
      updateBus.marker.setIcon()
    } else {
      // create new marker
      let tempMarker = { bus: runningBusses, marker: this.createMarker(runningBusses) };
      let popupMessage = '<b>' + runningBusses.busDriver.firstName + ' ' + runningBusses.busDriver.lastName + '</b><br>Route ID ' + runningBusses.routeID + '<br>Bus Registration ' + runningBusses.bus.registrationNumber;

      tempMarker.marker.addTo(this.map)
        .bindPopup(popupMessage)
        .on("click", () => {
          this.markerOnClick(runningBusses.id);
        });

      this.marker.push(tempMarker);
    }

  }

  createMarker(runningBus: RunningBus): L.marker {
    var marker;

    console.log("test see me ", runningBus.passengers);
    console.log(runningBus.passengers === undefined);

    if (runningBus.passengers != undefined) {
      var temp = (runningBus.passengers.total / runningBus.bus.capacityBoundary) * 100;

      //console.log("Temp ",runningBus.passengers.total , runningBus.bus.capacityBoundary , runningBus.passengers.total / runningBus.bus.capacityBoundary * 100);
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
    // console.log(id);
    let marker = this.marker.find(element => element.bus.id == id);

    if (marker.bus !== undefined) {
      this.selectedRunningBus = marker.bus;
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

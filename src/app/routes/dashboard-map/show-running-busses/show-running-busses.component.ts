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
import { Router } from '@angular/router';

export interface BusMarker {
  bus: RunningBus;
  marker: L.marker;
}

@Component({
  selector: 'app-dashboard-map-show-running-busses',
  templateUrl: './show-running-busses.component.html',
  styleUrls: ['./show-running-busses.component.scss']
})

export class DashboardMapShowRunningBussesComponent implements OnInit {
  //runningBusses: Array<RunningBus>;
  selectedRunningBus: RunningBus;
  private map;
  marker = new Array<BusMarker>();
  subscription: Subscription;
  source = interval(4000);



  constructor(
    private mapRepositoryService: MapRepositoryService,
    private router: Router
  ) { }

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
            temp => {
              runningBus.passengers = undefined;
            }
          ).finally(() => {
            this.setMarker(runningBus);
          });
      });
    });
  }



  setMarker(runningBusses: RunningBus) {
    // check if marker exsists
    // if not create if it does exsists update marker and override
    let popupMessage = '<b>' + runningBusses.busDriver.firstName + ' ' + runningBusses.busDriver.lastName + '</b><br>Bus Registration ' + runningBusses.bus.registrationNumber + "<br>Total Passengers " + runningBusses.passengers.total;
    let busMarker = { bus: null, marker: null };

    busMarker.marker = this.createMarker(runningBusses);
    busMarker.bus = runningBusses;

    var updateBus = this.marker.findIndex(marker => marker.bus.id == runningBusses.id);
    // update
    if (updateBus != -1) {
      this.markerDelAgain(this.marker[updateBus].marker);

      this.marker[updateBus].marker = busMarker.marker;
      this.marker[updateBus].bus = busMarker.bus;

      this.marker[updateBus].marker.addTo(this.map)
        .bindPopup(popupMessage)
        .on("click", () => {
          this.markerOnClick(runningBusses.id);
        }).on('mouseover', function (e) {
          this.openPopup();
        }).on('mouseout', function (e) {
          this.closePopup();
        });

    }
    // create marker
    else {
      this.marker.push({ bus: runningBusses, marker: busMarker.marker });

      let index = this.marker.findIndex(marker => marker.bus.id == runningBusses.id);

      this.marker[index].marker.addTo(this.map)
        .bindPopup(popupMessage)
        .on("click", () => {
          this.markerOnClick(runningBusses.id);
        }).on('mouseover', function (e) {
          this.openPopup();
        }).on('mouseout', function (e) {
          this.closePopup();
        });

    }
  }

  createMarker(runningBus: RunningBus): L.marker {
    var marker;

    if (runningBus.passengers != undefined) {
      var temp = (runningBus.passengers.total / runningBus.bus.capacityBoundary);

      if (temp >= 0.75) {
        marker = new L.marker([runningBus.longitude, runningBus.latitude], { icon: this.busIconDanger });
      } else if (temp >= 0.5) {
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
  markerDelAgain(marker) {
    this.map.removeLayer(marker);
  }

  // click on marker
  markerOnClick(id) {
    let marker = this.marker.find(element => element.bus.id == id);

    if (marker.bus !== undefined) {
      this.router.navigate(['bus-route/route-wrapper-modify'], { queryParams: { id: marker.bus.routeID } });
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

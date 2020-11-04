import { RunningBus } from './../../../../domain/entity/map';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { mapRoute } from 'domain/entity/map';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import { ToastrService } from 'ngx-toastr';
import { RouteRepositoryService } from 'domain/repository/route-repository.service';
import { ReturnBusStopWithOrderDto } from 'domain/index';

@Component({
  selector: 'app-dashboard-map-map-test',
  templateUrl: './map-test.component.html',
  styleUrls: ['./map-test.component.scss']
})
export class DashboardMapMapTestComponent implements AfterViewInit {
  private busRoutes: Array<mapRoute>;
  private runningBusses: Array<RunningBus>

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private mapRepositoryService: MapRepositoryService,
    private routeRepositoryService: RouteRepositoryService
  ) { }
  ngAfterViewInit(): void {
    this.getRunningBusses();
  }

  // setup as a fork join
  getRunningBusses() {
    this.mapRepositoryService.getRunningBusses().subscribe(
      res => {
        this.runningBusses = [];
        this.runningBusses = res;
        this.getMapArray();
      },
      err => {
        console.log('err');
      }
    );
  }

  getMapArray() {
    if (this.runningBusses !== undefined) {
      console.log("test test");
      console.log(this.runningBusses);
      this.runningBusses.forEach(runningBus => {
        let mapRouteObj: mapRoute;

        this.routeRepositoryService.getBusStopByRoute(runningBus.routeID).subscribe(res => {
          res.forEach(busStop => {
            mapRouteObj.routeCordinates.push({
              latitude: busStop.busStop.latitude,
              longitude: busStop.busStop.longitude
            });
          });
        });

        console.log(runningBus);
        mapRouteObj.bus = {
          cordinates: {
            latitude: runningBus.latitude,
            longitude: runningBus.longitude
          },
          busNumber: runningBus.bus.registrationNumber,
        };
      });
      console.log(this.busRoutes);
    }
  }

}

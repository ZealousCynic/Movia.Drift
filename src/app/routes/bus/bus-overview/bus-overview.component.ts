import { RunningBus } from './../../../../domain/entity/map';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { mapRoute } from 'domain/entity/map';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import { ToastrService } from 'ngx-toastr';
import { RouteRepositoryService } from 'domain/repository/route-repository.service';
import { ReturnBusStopWithOrderDto, ReturnRouteBusStopDto } from 'domain/index';

@Component({
  selector: 'app-bus-bus-overview',
  templateUrl: './bus-overview.component.html',
  styleUrls: ['./bus-overview.component.scss']
})
export class BusBusOverviewComponent implements OnInit {
  public mapRoute:Array<ReturnBusStopWithOrderDto>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private mapRepositoryService: MapRepositoryService,
    private routeRepositoryService: RouteRepositoryService    
  ) { }

  ngOnInit() {
    this.getTestRoute();
  }

  getTestRoute(){
    this.routeRepositoryService.getBusStopByRoute(1).subscribe(busStops=>{
      this.mapRoute = [];
      this.mapRoute = busStops;
      console.log("set map route");
      console.log(this.mapRoute);
    });
  }
}

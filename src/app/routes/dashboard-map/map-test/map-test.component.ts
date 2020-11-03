import { RunningBus } from './../../../../domain/entity/map';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { mapRoute } from 'domain/entity/map';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import { ToastrService } from 'ngx-toastr';

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
    private mapRepositoryService: MapRepositoryService
  ) { }
  ngAfterViewInit(): void {
    this.getRunningBusses();
  }

  // setup as a fork join
  getRunningBusses(){
    this.mapRepositoryService.getRunningBusses().subscribe(
      res => {
        console.log(res);
        this.runningBusses = [];
        this.runningBusses = res;
        console.log(this.runningBusses);
      },
      err => {
        console.log('err');
      }
    );
  }

}

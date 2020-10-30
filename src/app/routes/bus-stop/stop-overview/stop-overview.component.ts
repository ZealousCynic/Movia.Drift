import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BusStopDto } from 'domain/entity/busstop';
import { BusstopRepositoryService } from 'domain/repository/busstop-repository.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationDto } from '../../../../domain/index';
import { BusStopBusStopDeleteDialogComponent } from '../bus-stop-delete-dialog/bus-stop-delete-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bus-stop-stop-overview',
  templateUrl: './stop-overview.component.html',
  styleUrls: ['./stop-overview.component.scss'],
})
export class BusStopStopOverviewComponent implements AfterViewInit {
  public paginationDto: PaginationDto = <PaginationDto>{
    CurrentPage: 1,
    TotalPages: 0,
    PageSize: 10,
    TotalCount: 0,
    HasPrevious: true,
    HasNext: true,
  };

  displayedColumns: string[] = [
    'id',
    'label',
    'busStopNumber',
    'longitude',
    'latitude',
    'zone',
    'option',
  ];

  dataSource: MatTableDataSource<BusStopDto>;
  busStops: Array<BusStopDto>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private routeRepositoryService: BusstopRepositoryService
  ) {}

  ngAfterViewInit(): void {
    this.getBusStops();
  }

  goModify(routeId: number) {
    this.router.navigate(['/bus-stop/stop-info-modify'], { queryParams: { id: routeId } });
  }

  openDelDialog(busStopID: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(BusStopBusStopDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBusStop(busStopID);
      }
    });
  }

  deleteBusStop(busstopID : number){
      let deleteAnimalProfile$ = this.routeRepositoryService.deleteBusStop(busstopID);
      let successMessageTranslate$ = this.translateService.get(
        'success_deleted_bus_stop'
      );
  
      forkJoin([deleteAnimalProfile$, successMessageTranslate$]).subscribe(res => {
        //Refresh table
        this.busStops = this.busStops.filter(
          busStop => busStop.id != busstopID
        );
        this.paginationDto.TotalCount = this.paginationDto.TotalCount - 1;
        this.dataSource = new MatTableDataSource(this.busStops);
  
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
  
      });
  }

  getPaginatorData(pageIndex: number) {
    this.paginationDto.CurrentPage = pageIndex + 1;
    this.getBusStops();
  }

  getBusStops() {
    this.routeRepositoryService.getBusStopWithHeader(this.paginationDto).subscribe(
      res => {
        console.log(res);
        this.busStops = [];
        res.busStopDto.forEach(busStop => {
          this.busStops.push({
            id: busStop.id,
            stopNumber: busStop.stopNumber,
            label: busStop.label,
            longitude: busStop.longitude,
            latitude: busStop.latitude,
            zone: busStop.zone,
          });
        });

        this.paginationDto.TotalCount = res.pagination.TotalCount;
        this.dataSource = new MatTableDataSource(this.busStops);
      },
      err => {
        console.log('err');
      }
    );
  }
}

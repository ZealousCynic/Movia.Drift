import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { mapRoute } from 'domain/entity/map';
import { ReturnBusDto } from 'domain/entity/bus';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import { ToastrService } from 'ngx-toastr';
import { RouteRepositoryService } from 'domain/repository/route-repository.service';
import { PaginationDto, ReturnBusStopWithOrderDto, ReturnRouteBusStopDto } from 'domain/index';
import { MatTableDataSource } from '@angular/material/table';
import { BusRepositoryService } from 'domain/repository/bus-repository.service';
import { forkJoin } from 'rxjs';
import { BusBusDeleteDialogComponent } from '../bus-delete-dialog/bus-delete-dialog.component';

@Component({
  selector: 'app-bus-bus-overview',
  templateUrl: './bus-overview.component.html',
  styleUrls: ['./bus-overview.component.scss']
})
export class BusBusOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "registrationNumber",
    "capacityBoundary",
    "seatingPlace",
    "standingPlace",
    "busModel",
    "model",
    "length",
    "width",
    "option"
  ];
  dataSource: MatTableDataSource<ReturnBusDto>;
  busses:Array<ReturnBusDto>;
  public paginationDto: PaginationDto = <PaginationDto>{
    CurrentPage: 1,
    TotalPages: 0,
    PageSize: 10,
    TotalCount: 0,
    HasPrevious: true,
    HasNext: true,
  };


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private busRepositoryService:BusRepositoryService
  ) { }


  ngAfterViewInit(): void {
    this.getBusses();
  }

  getBusses(){
      this.busRepositoryService.getBusWithHeader(this.paginationDto).subscribe(
        res => {
          this.busses = [];
          res.bus.forEach(bus => {
            this.busses.push(bus);
          });
  
          this.paginationDto.TotalCount = res.pagination.TotalCount;
          this.dataSource = new MatTableDataSource(this.busses);
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
        },
        err => {
          console.log('err');
        }
      );
  }

  getPaginatorData(pageIndex: number) {
    this.paginationDto.CurrentPage = pageIndex + 1;
    this.getBusses();
  }

  goModify(busID: number) {
    this.router.navigate(['/bus/bus-info-modify'], { queryParams: { id: busID } });
  }

  openDelDialog(busID: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(BusBusDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBus(busID);
      }
    });
  }

  deleteBus(busID: number) {
    let deleteAnimalProfile$ = this.busRepositoryService.deleteBus(busID);
    let successMessageTranslate$ = this.translateService.get(
      'success_deleted_bus'
    );

    forkJoin([deleteAnimalProfile$, successMessageTranslate$]).subscribe(res => {
      //Refresh table
      this.busses = this.busses.filter(
        bus => bus.id != busID
      );
      this.paginationDto.TotalCount = this.paginationDto.TotalCount - 1;
      this.dataSource = new MatTableDataSource(this.busses);

      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });
    });
  }
}

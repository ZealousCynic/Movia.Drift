import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BusdriverRepositoryService, PaginationDto } from '../../../../domain/index';
import { BusDriverDto } from 'domain/entity/busdriver';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { BusDriverBusDriverDeleteDialogComponent } from '../bus-driver-delete-dialog/bus-driver-delete-dialog.component';

@Component({
  selector: 'app-bus-driver-driver-overview',
  templateUrl: './driver-overview.component.html',
  styleUrls: ['./driver-overview.component.scss']
})
export class BusDriverDriverOverviewComponent implements AfterViewInit {


  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'phoneNumber',
    'personnelNumber',
    'option'
  ];

  dataSource: MatTableDataSource<BusDriverDto>;
  public paginationDto: PaginationDto = <PaginationDto>{
    CurrentPage: 1,
    TotalPages: 0,
    PageSize: 10,
    TotalCount: 0,
    HasPrevious: true,
    HasNext: true,
  };
  busDrivers: Array<BusDriverDto>;
  // MatPaginator Output
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private busDriverRepositoryService: BusdriverRepositoryService) { }

  ngAfterViewInit() {
    this.getDusDrivers();
  }

  getPaginatorData(pageIndex: number) {
    this.paginationDto.CurrentPage = pageIndex + 1;
    this.getDusDrivers();
  }

  getDusDrivers() {
    this.busDriverRepositoryService.getBusDriversWithHeader(this.paginationDto).subscribe(
      res => {
        this.busDrivers = [];
        res.busDriverDtos.forEach(busDriver => {
          this.busDrivers.push({
            id: busDriver.id,
            personnelNumber: busDriver.personnelNumber,
            firstName: busDriver.firstName,
            lastName: busDriver.lastName,
            phoneNumber: busDriver.phoneNumber
          });
        });
        this.paginationDto.TotalCount = res.pagination.TotalCount;
        this.dataSource = new MatTableDataSource(this.busDrivers);
      },
      err => {
        console.log('err');
      }
    );
  }

  openDelDialog(busDriverID: number) {
    const dialogRef = this.dialog.open(BusDriverBusDriverDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBusDriver(busDriverID);
      }
    });
  }

  deleteBusDriver(busDriverID: number) {
    let deleteBusDriver$ = this.busDriverRepositoryService.deleteBusDriver(busDriverID);
    let successMessageTranslate$ = this.translateService.get(
      'success_deleted_profile'
    );

    forkJoin([deleteBusDriver$, successMessageTranslate$]).subscribe(res => {
      //Refresh table
      this.busDrivers = this.busDrivers.filter(
        busDriver => busDriver.id != busDriverID
      );
      this.paginationDto.TotalCount = this.paginationDto.TotalCount - 1;
      this.dataSource = new MatTableDataSource(this.busDrivers);

      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });
    });
  }

  goModify(busDriverID: number) {
    this.router.navigate(['bus-driver/driver-info-modify'], { queryParams: { id: busDriverID } });
  }
}
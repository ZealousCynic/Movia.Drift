import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BusStopDto } from 'domain/entity/busstop';
import { BusstopRepositoryService } from 'domain/repository/busstop-repository.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bus-stop-stop-overview',
  templateUrl: './stop-overview.component.html',
  styleUrls: ['./stop-overview.component.scss']
})
export class BusStopStopOverviewComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'label',
    'busStopNumber',
    'longitude',
    'latitude',
    'zone',
    'option'
  ];

  dataSource: MatTableDataSource<BusStopDto>;
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private routeRepositoryService: BusstopRepositoryService
  ) { }

  ngAfterViewInit(): void {
    this.getBusStops();
  }

  getBusStops(){
    this.routeRepositoryService.getBusStops().subscribe(
      res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      err => {
        console.log('err');
      }
    );
  }

  goModify(routeId: number) {
    this.router.navigate(['/bus-stop/busstop-wrapper-modify'], { queryParams: { id: routeId } });
  }

  openDelDialog(routeId: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(BusStopDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.deleteAnimalProfiles(animalID);
      }
    });
  } 


}

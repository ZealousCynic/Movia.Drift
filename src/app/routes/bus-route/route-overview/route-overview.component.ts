import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { BusRouteRouteDeleteDialogComponent } from '../route-delete-dialog/route-delete-dialog.component';
import { PaginationDto, ReturnRouteDto, RouteRepositoryService } from '../../../../domain/index';

@Component({
  selector: 'app-bus-route-route-overview',
  templateUrl: './route-overview.component.html',
  styleUrls: ['./route-overview.component.scss']
})
export class BusRouteRouteOverviewComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'label',
    'description',
    'option'
  ];

  dataSource: MatTableDataSource<ReturnRouteDto>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private routeRepositoryService: RouteRepositoryService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getRoutes();
  }

  getRoutes() {
    this.routeRepositoryService.getRoutes().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
      },
      err => {
        console.log('err');
      }
    );
  }


  goModify(routeId: number) {
    this.router.navigate(['/bus-route/route-wrapper-modify'], { queryParams: { id: routeId } });
  }

  openDelDialog(routeId: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(BusRouteRouteDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.deleteAnimalProfiles(animalID);
      }
    });
  }  

}

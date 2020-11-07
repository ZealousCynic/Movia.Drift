import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ReturnBusModelDto, BusmodelRepositoryService } from '../../../../domain/index';
import { BusModelModelDeleteDialogComponent } from '../model-delete-dialog/model-delete-dialog.component';

@Component({
  selector: 'app-bus-model-model-overview',
  templateUrl: './model-overview.component.html',
  styleUrls: ['./model-overview.component.scss']
})
export class BusModelModelOverviewComponent implements AfterViewInit {
  
  displayedColumns: string[] = [
    'id',
    'manufacturer',
    'model',
    'length',
    'width',
    'height',
    'powerTrain',
    'option'
  ];

  dataSource: MatTableDataSource<ReturnBusModelDto>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private busModelRepositoryService: BusmodelRepositoryService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getBusModels();
  }

  getBusModels() {
    this.busModelRepositoryService.getBusModels().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
      },
      err => {
        console.log('err');
      }
    );
  }

  goModify(busModelId: number) {
    this.router.navigate(['/bus-model/model-info-modify'], { queryParams: { id: busModelId } });
  }

  openDelDialog(busModelId: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(BusModelModelDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBusModel(busModelId);
      }
    });
  }

  deleteBusModel(busModelId: number) {
    let deleteBusModel$ = this.busModelRepositoryService.deleteBusMode(busModelId);
    let successMessageTranslate$ = this.translateService.get(
      'bus_model.success_removed_bus_model'
    );

    forkJoin([deleteBusModel$, successMessageTranslate$]).subscribe(res => {
      
      //Refresh table
      this.getBusModels();
      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });

    });

  }    


}

import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith,debounceTime } from 'rxjs/operators';
import { 
  ReturnRouteBusDto,
  ReturnRouteBusDriverlDto,
  RouteRepositoryService,
  ReturnBusAndDriverInRouteDto,
  BusWithDriverDto } from '../../../../domain/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusRouteRouteDeleteDialogComponent } from '../route-delete-dialog/route-delete-dialog.component';


@Component({
  selector: 'app-bus-route-route-busdriver-modify',
  templateUrl: './route-busdriver-modify.component.html',
  styleUrls: ['./route-busdriver-modify.component.scss']
})
export class BusRouteRouteBusdriverModifyComponent implements AfterViewInit {

  @Input() routeId: number = 0;

  findBusControl = new FormControl();
  selectBusOption: Array<ReturnRouteBusDto> = [];  
  filteredBusOptions: Observable<Array<ReturnRouteBusDto>>;

  findDriverControl = new FormControl();
  selectDriverOption: Array<ReturnRouteBusDriverlDto> = [];  
  filteredDriverOptions: Observable<Array<ReturnRouteBusDriverlDto>>;

  displayedColumns: string[] = [
    'registrationNumber',
    'capacityBoundary',
    'driver',
    'option'
  ];

  routeBusDriverDataSource: MatTableDataSource<ReturnBusAndDriverInRouteDto>;

  constructor(    
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private routeRepositoryService: RouteRepositoryService,
    public dialog: MatDialog) { }

  ngOnInit() {
    
    this.initialBusSelectOpiton();
    this.initialDriverSelectOpiton();

    this.filteredBusOptions = this.findBusControl.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      map(value => this._busFilter(value))
    );
    this.filteredDriverOptions = this.findDriverControl.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      map(value => this._driverFilter(value))
    );    
  }

  ngAfterViewInit() {
    this.getBusAndDriver();
  }

  ngBack() {
    this.router.navigate(['/bus-route/route-overview']);
  }

  getBusAndDriver() {
    this.routeRepositoryService.getBusAndDriverToRoute(this.routeId).subscribe(
      res => {
        console.log(res);
        this.routeBusDriverDataSource = new MatTableDataSource(res);
      },
      err => {
        console.log('err');
      }
    );
  }

  addBusAndDriver() {

    let isValidBus : boolean = false;
    let isValidDriver : boolean = false;
    let busId : number = 0;
    let driverId : number = 0;
    
    //Valid bus 
    //string template : "option.registrationNumber + ',' + option.busModel.manufacturer"
    this.selectBusOption.forEach(item=>{      
      let busString : string = item.registrationNumber + ',' + item.busModel.manufacturer;
      if (busString === this.findBusControl.value)
      {
        isValidBus = true;
        busId = item.id;
        return;
      }
    });

    //Valid driver 
    //string template : "option.firstName + ' ' + option.lastName + ',' + option.personnelNumber"
    this.selectDriverOption.forEach(item=>{
      let busString : string = item.firstName + ' ' + item.lastName + ',' + item.personnelNumber;
      if (busString === this.findDriverControl.value)
      {
        isValidDriver = true;
        driverId = item.id;
        return;
      }
    });    

    if ( isValidBus && isValidDriver)
    {

      let busWithDriverDto : BusWithDriverDto = {busID: busId, busDriverID: driverId};
      let addBusWithDriverToRoute$ = this.routeRepositoryService
                    .addBusWithDriverToRoute(this.routeId, busWithDriverDto);
      let successMessageTranslate$ = this.translateService.get('bus_route.success_added_bus');
      let errorMessageTranslate$ = this.translateService.get('bus_route.error_add_bus');      
      forkJoin([addBusWithDriverToRoute$, successMessageTranslate$]).subscribe(
        res => {          
          this.getBusAndDriver();
          this.toastr.success(res[1], '', {
            timeOut: 2000,
          });
          
        },
        error => {
          errorMessageTranslate$.subscribe(
            res=>{
              this.toastr.error('Error', '', {
                timeOut: 2000,
              });
            }
          );
        }
      );


    } 
    else
    {
      let invalidBusStopMessageTranslate$ = this.translateService.get('bus_route.invalid_bus_or_driver');
      invalidBusStopMessageTranslate$.subscribe(res=>{
        this.toastr.error(res, '', {
          timeOut: 2000,
        });
      });
    }

  }  

  openDelDialog(busId: number) {
    const dialogRef = this.dialog.open(BusRouteRouteDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let removeBusFromRoute$ = this.routeRepositoryService.removeBusFromRoute(this.routeId, busId);
        let successMessageTranslate$ = this.translateService.get('bus_route.success_removed_bus');

        forkJoin([removeBusFromRoute$, successMessageTranslate$]).subscribe(
          res => {
            this.getBusAndDriver();
            this.toastr.success(res[1], '', {
              timeOut: 2000,
            });            
            
          },
          err => {
            this.toastr.error('Error', '', {
              timeOut: 2000,
            });                
          }
        );

      }
    });
    
  }

  private _busFilter(value: string): ReturnRouteBusDto[] {
    const filterValue = value.toLowerCase();
    return this.selectBusOption.filter(option => 
      option.registrationNumber.toLowerCase().includes(filterValue)
    );
  }

  private _driverFilter(value: string): ReturnRouteBusDriverlDto[] {
    console.log("value:");
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.selectDriverOption.filter(option => 
      option.firstName.toLowerCase().includes(filterValue) ||
      option.lastName.toLowerCase().includes(filterValue) ||
      option.personnelNumber.toLowerCase().includes(filterValue)
    );
  }

  initialBusSelectOpiton() {
    this.routeRepositoryService.getAllBusToRoute().subscribe(
      res=>{
        res.forEach(item=>{
          this.selectBusOption.push(item);
        });
      }
    );
  }  

  initialDriverSelectOpiton() {
    this.routeRepositoryService.getAllDriverToRoute().subscribe(
      res=>{
        res.forEach(item=>{
          this.selectDriverOption.push(item);
        });
      }
    );
  }    

}

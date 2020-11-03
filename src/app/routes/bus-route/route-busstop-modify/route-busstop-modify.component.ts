import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith,debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { 
  ReturnRouteBusStopDto, 
  ReturnBusStopWithOrderDto, 
  RouteRepositoryService } from '../../../../domain/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BusRouteRouteDeleteDialogComponent } from '../route-delete-dialog/route-delete-dialog.component';

@Component({
  selector: 'app-bus-route-route-busstop-modify',
  templateUrl: './route-busstop-modify.component.html',
  styleUrls: ['./route-busstop-modify.component.scss']
})
export class BusRouteRouteBusstopModifyComponent implements OnInit {

  @Input() routeId: number = 0;

  findBusStopControl = new FormControl();
  selectBusOption: Array<ReturnRouteBusStopDto> = [];  
  filteredOptions: Observable<Array<ReturnRouteBusStopDto>>;

  busStopOfRoute: Array<ReturnBusStopWithOrderDto> = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private routeRepositoryService: RouteRepositoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {    
    this.initialBusstopSelectOpiton();
    this.initialBusstopListOfRoute();
    this.filteredOptions = this.findBusStopControl.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): ReturnRouteBusStopDto[] {
    const filterValue = value.toLowerCase();
    return this.selectBusOption.filter(option => 
      option.label.toLowerCase().includes(filterValue)
    );
  }

  ngBack() {
    this.router.navigate(['/bus-route/route-overview']);
  }

  addBusStop() {
    //Valid bus stop
    //string template : {{option.label}},{{option.stopNumber}}
    let isValidBusStop : boolean = false;
    
    this.selectBusOption.forEach(item=>{
      let busStopString : string = item.label + ',' + item.stopNumber;
      if (busStopString === this.findBusStopControl.value)
      {
        isValidBusStop = true;
        
        let orderOfBusStop = 0;
        if (this.busStopOfRoute.length > 0 )
        {
          orderOfBusStop = this.busStopOfRoute[this.busStopOfRoute.length -1 ].order + 1;          
        }
        
        let successMessageTranslate$ = this.translateService.get('bus_route.success_added_bus_stop');
        let addBusStopToRoute$ = this.routeRepositoryService.addBusStopToRoute(
          this.routeId, 
          item.id, 
          orderOfBusStop
        );
        forkJoin([addBusStopToRoute$, successMessageTranslate$]).subscribe(
          res => {          
            this.toastr.success(res[1], '', {
              timeOut: 2000,
            });
            this.busStopOfRoute.push( { order: orderOfBusStop, busStop: item } );
          },
          error => {
            this.toastr.success('Error', '', {
              timeOut: 2000,
            });
          }
        );     
        return;
      }
    });

    if (! isValidBusStop)
    {
      let invalidBusStopMessageTranslate$ = this.translateService.get('bus_route.invalid_bus_stop');
      invalidBusStopMessageTranslate$.subscribe(res=>{
        this.toastr.error(res, '', {
          timeOut: 2000,
        });
      });
    } 
  }

  removeBusStop(busStopId : number) {

    const dialogRef = this.dialog.open(BusRouteRouteDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let removeBusStopItem$ = this.routeRepositoryService.removeBusStopFromRoute(this.routeId,busStopId);
        let successMessageTranslate$ = this.translateService.get('bus_route.success_removed_bus_stop');

        forkJoin([removeBusStopItem$, successMessageTranslate$]).subscribe(
          res => {
            this.toastr.success(res[1], '', {
              timeOut: 2000,
            });            
            //Remove item of stop
            let indexBusStopItem : number = this.busStopOfRoute
                        .map(item => item.busStop.id)
                        .indexOf(busStopId);
            this.busStopOfRoute.splice(indexBusStopItem , 1);
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

  initialBusstopSelectOpiton() {
    //getAllBusStop
    this.routeRepositoryService.getAllBusStop().subscribe(
      res=>{
        res.forEach(item=>{
          this.selectBusOption.push(item);
        });
      }
    );
  }

  initialBusstopListOfRoute() {
    this.routeRepositoryService.getBusStopByRoute(this.routeId).subscribe(
      res=>{
        res.forEach(item=>{
          this.busStopOfRoute.push(item);
        });
      }
    );
    console.log('initialBusstopListOfRoute');
  }

  drop(event: CdkDragDrop<ReturnBusStopWithOrderDto[]>) {    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
       
    //Reset the order of bus stop
    let successMessageTranslate$ = this.translateService.get('bus_route.success_updated_bus_stop');    
    let updateOrderItem$ : Array<Observable<any>>  = [successMessageTranslate$];
    event.container.data.forEach(
      (item,index)=>{
        updateOrderItem$.push(
          this.routeRepositoryService.addBusStopToRoute(
            this.routeId, 
            item.busStop.id, 
            index + 1
          )
        )
      }
    );

    forkJoin(updateOrderItem$).subscribe(
      res => {          
        this.toastr.success(res[0], '', {
          timeOut: 2000,
        });        
      },
      error => {
        this.toastr.error('Error', '', {
          timeOut: 2000,
        });
      }
    );

  }

}

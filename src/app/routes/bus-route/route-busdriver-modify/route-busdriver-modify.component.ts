import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith,debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { 
  ReturnRouteBusStopDto, 
  ReturnRouteBusDto,
  ReturnBusStopWithOrderDto, 
  RouteRepositoryService } from '../../../../domain/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BusRouteRouteDeleteDialogComponent } from '../route-delete-dialog/route-delete-dialog.component';


@Component({
  selector: 'app-bus-route-route-busdriver-modify',
  templateUrl: './route-busdriver-modify.component.html',
  styleUrls: ['./route-busdriver-modify.component.scss']
})
export class BusRouteRouteBusdriverModifyComponent implements OnInit {

  @Input() routeId: number = 0;

  findBusControl = new FormControl();
  selectBusOption: Array<ReturnRouteBusDto> = [
    {
      id: 1, 
      registrationNumber: 'AV 23564', 
      capacityBoundary: 20, 
      seatingPlace: 30, 
      standingPlace: 25, 
      busModel: {id: 1, manufacturer: '1Volvo', model: '1model', length: '1lenght', width: '1width', height: '1height', powerTrain: '1powerTrain'}
    },
    {
      id: 2, 
      registrationNumber: 'SE 22554', 
      capacityBoundary: 30, 
      seatingPlace: 45, 
      standingPlace: 65, 
      busModel: {id: 2, manufacturer: '2Volvo', model: '1model', length: '2lenght', width: '1width', height: '1height', powerTrain: '1powerTrain'}
    },
    {
      id: 3, 
      registrationNumber: 'TR 45814', 
      capacityBoundary: 35, 
      seatingPlace: 65, 
      standingPlace: 35, 
      busModel: {id: 3, manufacturer: '3Volvo', model: '1model', length: '2lenght', width: '1width', height: '1height', powerTrain: '1powerTrain'}
    }
  ];  
  filteredBusOptions: Observable<Array<ReturnRouteBusDto>>;

  constructor() { }

  ngOnInit() {
    
    this.filteredBusOptions = this.findBusControl.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      map(value => this._busFilter(value))
    );
  }

  ngBack() {
  }

  private _busFilter(value: string): ReturnRouteBusDto[] {
    const filterValue = value.toLowerCase();
    return this.selectBusOption.filter(option => 
      option.registrationNumber.toLowerCase().includes(filterValue)
    );
  }


}

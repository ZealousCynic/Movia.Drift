import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BusDto, mapRoute } from 'domain/entity/map';
import { MapRepositoryService } from 'domain/repository/map-repository.service';
import { ToastrService } from 'ngx-toastr';
import { RouteRepositoryService } from 'domain/repository/route-repository.service';
import { PaginationDto, ReturnBusStopWithOrderDto, ReturnRouteBusStopDto } from 'domain/index';
import { MatTableDataSource } from '@angular/material/table';
import { BusRepositoryService } from 'domain/repository/bus-repository.service';

@Component({
  selector: 'app-bus-bus-overview',
  templateUrl: './bus-overview.component.html',
  styleUrls: ['./bus-overview.component.scss']
})
export class BusBusOverviewComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'scientificName',
    'weight',
    'height',
    'animalNature',
    'place',
    'option',
  ];
  dataSource: MatTableDataSource<BusDto>;
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

  ngOnInit() {
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

import {
  PaginationDto,
  AnimalRepositoryService,
  UpdateAnimalStatusDto,
} from '../../../domain/index';

export interface AnimalProfileDS {
  id: string;
  name: string;
  scientificName: string;
  animalStatus: string;
  animalNature: string;
  place: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'scientificName',
    'animalStatus',
    'animalNature',
    'place',
    'option',
  ];

  dataSource: MatTableDataSource<AnimalProfileDS>;
  public paginationDto: PaginationDto = <PaginationDto>{
    CurrentPage: 1,
    TotalPages: 0,
    PageSize: 10,
    TotalCount: 0,
    HasPrevious: true,
    HasNext: true,
  };
  animalProfiles: Array<AnimalProfileDS>;
  // MatPaginator Output
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cdr: ChangeDetectorRef,
    private animalRepositoryService: AnimalRepositoryService
  ) {}

  ngOnInit() {
    this.getAnimalProfiles();
  }

  getPaginatorData(pageIndex: number) {
    this.paginationDto.CurrentPage = pageIndex + 1;
    this.getAnimalProfiles();
  }

  setStatusOfAnimal(animalID: number, $event: MatSlideToggleChange) {
    let updateAnimalStatusDto: UpdateAnimalStatusDto = {
      isVisibility: $event.checked,
      longitude: 0,
      latitude: 0,
    };
    this.animalRepositoryService
      .updateAnimalStatus(animalID, updateAnimalStatusDto)
      .subscribe(res => {
        let animalProfile = this.animalProfiles.find(item => +item.id == animalID);
        console.log(animalProfile);
        if (animalProfile) {
          animalProfile.animalStatus = $event.checked ? 'false' : 'true';
        }
      });
  }

  getAnimalProfiles() {
    this.animalRepositoryService.getAnimalProfilsWithHeader(this.paginationDto).subscribe(
      res => {
        this.animalProfiles = [];
        res.animalProfiles.forEach(animal => {
          this.animalProfiles.push({
            id: animal.id,
            name: animal.name,
            scientificName: animal.scientificName,
            animalStatus: animal.animalStatus.isVisibility ? 'true' : 'false',
            animalNature: animal.animalNature.label,
            place: animal.place.label,
          });
        });

        this.paginationDto.TotalCount = res.pagination.TotalCount;
        this.dataSource = new MatTableDataSource(this.animalProfiles);
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
      },
      err => {
        console.log('err');
      }
    );
  }
}

import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { AnimalAnimalDeleteDialogComponent } from '../animal-delete-dialog/animal-delete-dialog.component';
import { PaginationDto, AnimalRepositoryService } from '../../../../domain/index';

export interface DelDialogData {
  isDelete: boolean;
}

export interface AnimalProfileDS {
  id: string;
  name: string;
  scientificName: string;
  weight: string;
  height: string;
  lifeExpectancy: string;
  pregnancy: string;
  numberOfChildren: string;
  birthWeight: string;
  sexualMaturity: string;
  food: string;
  incubationTime: string;
  animalStatus: string;
  animalNature: string;
  place: string;
}

@Component({
  selector: 'app-animal-animal-overview',
  templateUrl: './animal-overview.component.html',
  styleUrls: ['./animal-overview.component.scss'],
})
export class AnimalAnimalOverviewComponent implements AfterViewInit {
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
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private animalRepositoryService: AnimalRepositoryService
  ) {
    //this.getAnimalProfiles();
    //this.dataSource = new MatTableDataSource(this.animalProfiles);
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getAnimalProfiles();
  }

  getPaginatorData(pageIndex: number) {
    this.paginationDto.CurrentPage = pageIndex + 1;
    this.getAnimalProfiles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goModify(animalID: number) {
    this.router.navigate(['/animal/animal-modify'], { queryParams: { id: animalID } });
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
            weight: animal.weight,
            height: animal.height,
            lifeExpectancy: animal.lifeExpectancy,
            pregnancy: animal.pregnancy,
            numberOfChildren: animal.numberOfChildren,
            birthWeight: animal.birthWeight,
            sexualMaturity: animal.sexualMaturity,
            food: animal.food,
            incubationTime: animal.incubationTime,
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

  openDelDialog(animalID: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(AnimalAnimalDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAnimalProfiles(animalID);
      }
    });
  }

  deleteAnimalProfiles(animalID: number) {
    let deleteAnimalProfile$ = this.animalRepositoryService.deleteAnimalProfile(animalID);
    let successMessageTranslate$ = this.translateService.get(
      'success_deleted_profile'
    );

    forkJoin([deleteAnimalProfile$, successMessageTranslate$]).subscribe(res => {
      //Refresh table
      this.animalProfiles = this.animalProfiles.filter(
        animal => animal.id != animalID.toString()
      );
      this.paginationDto.TotalCount = this.paginationDto.TotalCount - 1;
      this.dataSource = new MatTableDataSource(this.animalProfiles);

      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });

    });

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Img from 'photoviewer';
import { forkJoin } from 'rxjs';
import {
  ReturnAnimalPictureDto,
  UpdateStatusOfAnimalPictureDto,
  AnimalRepositoryService,
} from '../../../../domain/index';
import { AnimalAnimalDeleteDialogComponent } from '../animal-delete-dialog/animal-delete-dialog.component';

@Component({
  selector: 'app-animal-animal-modify-album',
  templateUrl: './animal-modify-album.component.html',
  styleUrls: ['./animal-modify-album.component.scss'],
})
export class AnimalAnimalModifyAlbumComponent implements OnInit {
  @Input() animalID: number;
  public photoViewItems: any = [];
  displayedColumns: string[] = ['id', 'path', 'profilePicture', 'coverPicture', 'option'];
  dataSource: MatTableDataSource<ReturnAnimalPictureDto>;
  animalPictures: Array<ReturnAnimalPictureDto>;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private animalRepositoryService: AnimalRepositoryService,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getPictureOfAnimal(this.animalID);
  }

  getPictureOfAnimal(animalID: number) {
    // this.animalPictures = <Array<ReturnAnimalPictureDto>>[
    //   {
    //     id: '1',
    //     path: 'http://lorempixel.com/400/200/animals/1/',
    //     animalProfileID: '1',
    //     pictureTypeID: '3',
    //   },
    //   {
    //     id: '2',
    //     path: 'http://lorempixel.com/400/200/animals/2/',
    //     animalProfileID: '1',
    //     pictureTypeID: '2',
    // ];

    this.animalRepositoryService.getPicturesOfAnimal(animalID).subscribe(res => {
      console.log('getPicturesOfAnimal');
      console.log(res);
      this.animalPictures = <Array<ReturnAnimalPictureDto>>[];
      res.forEach(picture => {
        this.animalPictures.push({
          id: picture.id.toString(),
          path: picture.path.toString(),
          animalProfileID: picture.animalProfileID.toString(),
          pictureTypeID: picture.pictureTypeID.toString(),
        });
      });
      this.animalPictures.forEach(element => {
        this.photoViewItems.push({ src: element.path, title: '' });
      });
      this.dataSource = new MatTableDataSource(this.animalPictures);
    });
  }

  onUploadFile = (files: string | any[]) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('pictureFile', fileToUpload, fileToUpload.name);

    let createAnimalPicture$ = this.animalRepositoryService.createPictureOfAnimal(
      this.animalID,
      formData
    );
    let successMessageTranslate$ = this.translateService.get('animalTable.success_updated_picture');

    forkJoin([createAnimalPicture$, successMessageTranslate$]).subscribe(res => {
      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });
      this.getPictureOfAnimal(this.animalID);
    });
  };

  onPhotoViewer(photoViewIndex: number) {
    let options = {
      index: photoViewIndex,
      title: false,
      initMaximized: true,
    };
    let viewer = new PhotoViewer(this.photoViewItems, options);
  }

  ngBack() {
    this.router.navigate(['/animal/animal-overview']);
  }

  openDelDialog(pictureID: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(AnimalAnimalDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.deleteAnimalProfiles(animalID);
        console.log('clickeer ok');
        this.deletePictureOfProfile(pictureID);
      }
    });
  }

  deletePictureOfProfile(pictureID: number) {
    let deleteAnimalPicture$ = this.animalRepositoryService.deletePicturesOfAnimal(pictureID);
    let successMessageTranslate$ = this.translateService.get('animalTable.success_deleted_picture');

    forkJoin([deleteAnimalPicture$, successMessageTranslate$]).subscribe(res => {
      //Refresh table
      this.animalPictures = this.animalPictures.filter(animal => animal.id != pictureID.toString());
      this.dataSource = new MatTableDataSource(this.animalPictures);

      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });
    });
  }

  updateTypeOfPicture(idOfPicture: number, typeOfPicture: number) {
    //ID = 1, Label = "Cover Picture"
    //ID = 2, Label = "Profile Picture"
    //ID = 3, Label = "Album Pictures"

    let updateStatusOfAnimalPictureDto: UpdateStatusOfAnimalPictureDto = <
      UpdateStatusOfAnimalPictureDto
    >{ pictureTypeID: typeOfPicture };

    let updateTypeOfPicture$ = this.animalRepositoryService.updateTypeOfPicture(
      idOfPicture,
      updateStatusOfAnimalPictureDto
    );
    let successMessageTranslate$ = this.translateService.get('animalTable.success_updated_picture');

    forkJoin([updateTypeOfPicture$, successMessageTranslate$]).subscribe(res => {
      //Refresh table
      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });
      this.getPictureOfAnimal(this.animalID);      

    });

  }
}

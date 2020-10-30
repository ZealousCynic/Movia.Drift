import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ReturnAnimalSoundDto, AnimalRepositoryService } from '../../../../domain/index';
import { AnimalAnimalDeleteDialogComponent } from '../animal-delete-dialog/animal-delete-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-animal-animal-modify-sound',
  templateUrl: './animal-modify-sound.component.html',
  styleUrls: ['./animal-modify-sound.component.scss'],
})
export class AnimalAnimalModifySoundComponent implements OnInit {
  @Input() animalID: number;
  animalSounds: Array<ReturnAnimalSoundDto>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private animalRepositoryService: AnimalRepositoryService) {
    // this.animalSounds = <Array<ReturnAnimalSoundDto>>[
    //   {
    //     id: '1',
    //     path: 'https://www.w3schools.com/html/horse.mp3',
    //     animalProfileID: '1',
    //   },
    //   {
    //     id: '2',
    //     path: 'https://www.w3schools.com/html/horse.mp3',
    //     animalProfileID: '1',
    //   },
    //   {
    //     id: '3',
    //     path: 'https://www.w3schools.com/html/horse.mp3',
    //     animalProfileID: '1',
    //   },
    // ];
  }

  ngOnInit() {
    this.getSoundOfAnimal(this.animalID);
  }

  getSoundOfAnimal(animalID: number) {

    this.animalRepositoryService.getSoundOfAnimal(animalID).subscribe(res => {
      
      console.log('getSoundOfAnimal');
      console.log(res);
      this.animalSounds = <Array<ReturnAnimalSoundDto>>[];
      res.forEach(sound => {
        this.animalSounds.push({
          id: sound.id.toString(),
          path: sound.path.toString(),
          animalProfileID: sound.animalProfileID.toString()
        });
      });

    });
  }  

  onUploadFile = (files: string | any[]) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('soundFile', fileToUpload, fileToUpload.name);

    let createAnimalSound$ = this.animalRepositoryService.createSoundOfAnimal(this.animalID, formData);
    let successMessageTranslate$ = this.translateService.get("animalTable.success_updated_sound");

    forkJoin([createAnimalSound$, successMessageTranslate$]).subscribe(res => {
      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });
      this.getSoundOfAnimal(this.animalID);
    });    

  }

  openDelDialog(soundID: number) {
    //confirm deletion
    const dialogRef = this.dialog.open(AnimalAnimalDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('click ok');
        console.log('soundID:');
        console.log(soundID);
        this.deleteSoundOfProfile(soundID);
      }
    });
  }  

  deleteSoundOfProfile(soundID: number) {
    let deleteAnimalSound$ = this.animalRepositoryService.deleteSoundOfAnimal(soundID);
    let successMessageTranslate$ = this.translateService.get('animalTable.success_deleted_sound');
    
    forkJoin([deleteAnimalSound$, successMessageTranslate$]).subscribe(res => {
      
      this.animalSounds = this.animalSounds.filter(sound => sound.id != soundID.toString());

      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });
    });
  }  

  getFilename(url): string {
    return url?url.split('/').pop().split('#').shift().split('?').shift():null
  }

  ngBack() {
    this.router.navigate(['/animal/animal-overview']);
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalAnimalOverviewComponent } from './animal-overview/animal-overview.component';
import { AnimalAnimalModifyComponent } from './animal-modify/animal-modify.component';
import { AnimalAnimalModifyProfileComponent } from './animal-modify-profile/animal-modify-profile.component';
import { AnimalAnimalModifyAlbumComponent } from './animal-modify-album/animal-modify-album.component';
import { AnimalAnimalModifySoundComponent } from './animal-modify-sound/animal-modify-sound.component';
import { AnimalAnimalModifyQRCodeComponent } from './animal-modify-qrcode/animal-modify-qrcode.component';
import { AnimalAnimalCreateComponent } from './animal-create/animal-create.component';
import { AnimalAnimalDeleteDialogComponent } from './animal-delete-dialog/animal-delete-dialog.component';

const routes: Routes = [
  { path: 'animal-overview', component: AnimalAnimalOverviewComponent },
  { path: 'animal-modify', component: AnimalAnimalModifyComponent },
  { path: 'animal-modify-profile', component: AnimalAnimalModifyProfileComponent },
  { path: 'animal-modify-album', component: AnimalAnimalModifyAlbumComponent },
  { path: 'animal-modify-sound', component: AnimalAnimalModifySoundComponent },
  { path: 'animal-modify-QRCode', component: AnimalAnimalModifyQRCodeComponent },
  { path: 'animal-create', component: AnimalAnimalCreateComponent },
  { path: 'animal-delete-dialog', component: AnimalAnimalDeleteDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }

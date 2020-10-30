import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalAnimalOverviewComponent } from './animal-overview/animal-overview.component';
import { AnimalAnimalModifyComponent } from './animal-modify/animal-modify.component';
import { AnimalAnimalModifyProfileComponent } from './animal-modify-profile/animal-modify-profile.component';
import { AnimalAnimalModifyAlbumComponent } from './animal-modify-album/animal-modify-album.component';
import { AnimalAnimalModifySoundComponent } from './animal-modify-sound/animal-modify-sound.component';
import { AnimalAnimalModifyQRCodeComponent } from './animal-modify-qrcode/animal-modify-qrcode.component';
import { AnimalAnimalCreateComponent } from './animal-create/animal-create.component';
import { AnimalAnimalDeleteDialogComponent } from './animal-delete-dialog/animal-delete-dialog.component';

const COMPONENTS = [AnimalAnimalOverviewComponent, AnimalAnimalModifyComponent, AnimalAnimalModifyProfileComponent, AnimalAnimalModifyAlbumComponent, AnimalAnimalModifySoundComponent, AnimalAnimalModifyQRCodeComponent, AnimalAnimalCreateComponent, AnimalAnimalDeleteDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    AnimalRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class AnimalModule { }

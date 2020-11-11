import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BusModelRoutingModule } from './bus-model-routing.module';
import { BusModelModelOverviewComponent } from './model-overview/model-overview.component';
import { BusModelModelInfoModifyComponent } from './model-info-modify/model-info-modify.component';
import { BusModelModelDeleteDialogComponent } from './model-delete-dialog/model-delete-dialog.component';

const COMPONENTS = [BusModelModelOverviewComponent, BusModelModelInfoModifyComponent, BusModelModelDeleteDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BusModelRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BusModelModule { }

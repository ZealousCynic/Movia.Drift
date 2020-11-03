import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BusDriverRoutingModule } from './bus-driver-routing.module';
import { BusDriverDriverInfoModifyComponent } from './driver-info-modify/driver-info-modify.component';
import { BusDriverDriverOverviewComponent } from './driver-overview/driver-overview.component';
import { BusDriverBusDriverDeleteDialogComponent } from './bus-driver-delete-dialog/bus-driver-delete-dialog.component';

const COMPONENTS = [BusDriverDriverInfoModifyComponent, BusDriverDriverOverviewComponent, BusDriverBusDriverDeleteDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BusDriverRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BusDriverModule { }

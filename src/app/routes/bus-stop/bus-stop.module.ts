import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BusStopRoutingModule } from './bus-stop-routing.module';
import { BusStopStopOverviewComponent } from './stop-overview/stop-overview.component';
import { BusStopStopInfoModifyComponent } from './stop-info-modify/stop-info-modify.component';
import { BusStopBusStopDeleteDialogComponent } from './bus-stop-delete-dialog/bus-stop-delete-dialog.component';

const COMPONENTS = [BusStopStopOverviewComponent, BusStopStopInfoModifyComponent, BusStopBusStopDeleteDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BusStopRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BusStopModule { }

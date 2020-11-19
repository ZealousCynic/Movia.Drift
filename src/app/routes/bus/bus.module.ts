import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BusRoutingModule } from './bus-routing.module';
import { BusBusOverviewComponent } from './bus-overview/bus-overview.component';
import { BusBusInfoModifyComponent } from './bus-info-modify/bus-info-modify.component';
import { DashboardMapModule } from '../dashboard-map/dashboard-map.module';
import { BusBusDeleteDialogComponent } from './bus-delete-dialog/bus-delete-dialog.component';

const COMPONENTS = [BusBusOverviewComponent, BusBusInfoModifyComponent, BusBusDeleteDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BusRoutingModule,
    DashboardMapModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BusModule { }

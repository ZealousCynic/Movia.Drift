import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BusRoutingModule } from './bus-routing.module';
import { BusBusOverviewComponent } from './bus-overview/bus-overview.component';
import { BusBusInfoModifyComponent } from './bus-info-modify/bus-info-modify.component';

const COMPONENTS = [BusBusOverviewComponent, BusBusInfoModifyComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BusRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BusModule { }

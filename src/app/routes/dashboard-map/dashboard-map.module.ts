import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardMapRoutingModule } from './dashboard-map-routing.module';
import { DashboardMapMapComponent } from './map/map.component';
import { DashboardMapMapTestComponent } from './map-test/map-test.component';
import { DashboardMapShowRunningBussesComponent } from './show-running-busses/show-running-busses.component';
import { DashboardMapRunningBusDetailsComponent } from './running-bus-details/running-bus-details.component';

const COMPONENTS = [DashboardMapMapComponent, DashboardMapMapTestComponent, DashboardMapShowRunningBussesComponent, DashboardMapRunningBusDetailsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    DashboardMapRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class DashboardMapModule { }

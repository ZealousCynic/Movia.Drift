import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardMapRoutingModule } from './dashboard-map-routing.module';
import { DashboardMapMapComponent } from './map/map.component';
import { DashboardMapMapTestComponent } from './map-test/map-test.component';

const COMPONENTS = [DashboardMapMapComponent, DashboardMapMapTestComponent];
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

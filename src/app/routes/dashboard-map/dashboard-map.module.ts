import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardMapRoutingModule } from './dashboard-map-routing.module';
import { DashboardMapMapComponent } from './map/map.component';

const COMPONENTS = [DashboardMapMapComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    DashboardMapRoutingModule
  ],
  exports: [DashboardMapMapComponent],  
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class DashboardMapModule { }

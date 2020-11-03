import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardMapRoutingModule } from './dashboard-map-routing.module';

const COMPONENTS = [];
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

import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BusRouteRoutingModule } from './bus-route-routing.module';
import { BusRouteRouteOverviewComponent } from './route-overview/route-overview.component';
import { BusRouteRouteInfoModifyComponent } from './route-info-modify/route-info-modify.component';
import { BusRouteRouteWrapperModifyComponent } from './route-wrapper-modify/route-wrapper-modify.component';
import { BusRouteRouteBusstopModifyComponent } from './route-busstop-modify/route-busstop-modify.component';
import { BusRouteRouteBusdriverModifyComponent } from './route-busdriver-modify/route-busdriver-modify.component';
import { BusRouteRouteDeleteDialogComponent } from './route-delete-dialog/route-delete-dialog.component';
import { DashboardMapModule } from '../dashboard-map/dashboard-map.module';

const COMPONENTS = [BusRouteRouteOverviewComponent, BusRouteRouteInfoModifyComponent, BusRouteRouteWrapperModifyComponent, BusRouteRouteBusstopModifyComponent, BusRouteRouteBusdriverModifyComponent, BusRouteRouteDeleteDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BusRouteRoutingModule,
    DashboardMapModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BusRouteModule { }

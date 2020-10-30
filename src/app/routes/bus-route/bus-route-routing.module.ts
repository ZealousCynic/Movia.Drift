import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusRouteRouteOverviewComponent } from './route-overview/route-overview.component';
import { BusRouteRouteInfoModifyComponent } from './route-info-modify/route-info-modify.component';
import { BusRouteRouteWrapperModifyComponent } from './route-wrapper-modify/route-wrapper-modify.component';
import { BusRouteRouteBusstopModifyComponent } from './route-busstop-modify/route-busstop-modify.component';
import { BusRouteRouteBusdriverModifyComponent } from './route-busdriver-modify/route-busdriver-modify.component';
import { BusRouteRouteDeleteDialogComponent } from './route-delete-dialog/route-delete-dialog.component';

const routes: Routes = [{ path: 'route-overview', component: BusRouteRouteOverviewComponent },
{ path: 'route-info-modify', component: BusRouteRouteInfoModifyComponent },
{ path: 'route-wrapper-modify', component: BusRouteRouteWrapperModifyComponent },
{ path: 'route-busstop-modify', component: BusRouteRouteBusstopModifyComponent },
{ path: 'route-busdriver-modify', component: BusRouteRouteBusdriverModifyComponent },
{ path: 'route-delete-dialog', component: BusRouteRouteDeleteDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRouteRoutingModule { }

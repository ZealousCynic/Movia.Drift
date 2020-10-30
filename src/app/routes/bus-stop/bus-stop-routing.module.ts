import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusStopStopOverviewComponent } from './stop-overview/stop-overview.component';
import { BusStopStopInfoModifyComponent } from './stop-info-modify/stop-info-modify.component';

const routes: Routes = [
{ path: 'stop-overview', component: BusStopStopOverviewComponent },
{ path: 'stop-info-modify', component: BusStopStopInfoModifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusStopRoutingModule { }

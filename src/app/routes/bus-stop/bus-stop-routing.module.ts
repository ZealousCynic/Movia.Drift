import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusStopStopOverviewComponent } from './stop-overview/stop-overview.component';
import { BusStopStopInfoModifyComponent } from './stop-info-modify/stop-info-modify.component';
import { BusStopBusStopDeleteDialogComponent } from './bus-stop-delete-dialog/bus-stop-delete-dialog.component';

const routes: Routes = [
{ path: 'stop-overview', component: BusStopStopOverviewComponent },
{ path: 'stop-info-modify', component: BusStopStopInfoModifyComponent },
{ path: 'bus-stop-delete-dialog', component: BusStopBusStopDeleteDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusStopRoutingModule { }

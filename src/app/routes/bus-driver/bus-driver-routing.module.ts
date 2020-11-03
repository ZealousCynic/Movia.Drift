import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusDriverDriverInfoModifyComponent } from './driver-info-modify/driver-info-modify.component';
import { BusDriverDriverOverviewComponent } from './driver-overview/driver-overview.component';
import { BusDriverBusDriverDeleteDialogComponent } from './bus-driver-delete-dialog/bus-driver-delete-dialog.component';

const routes: Routes = [
  { path: 'driver-info-modify', component: BusDriverDriverInfoModifyComponent },
  { path: 'driver-overview', component: BusDriverDriverOverviewComponent },
  { path: 'bus-driver-delete-dialog', component: BusDriverBusDriverDeleteDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusDriverRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusDriverDriverInfoModifyComponent } from './driver-info-modify/driver-info-modify.component';
import { BusDriverDriverOverviewComponent } from './driver-overview/driver-overview.component';

const routes: Routes = [{ path: 'driver-info-modify', component: BusDriverDriverInfoModifyComponent },
{ path: 'driver-overview', component: BusDriverDriverOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusDriverRoutingModule { }

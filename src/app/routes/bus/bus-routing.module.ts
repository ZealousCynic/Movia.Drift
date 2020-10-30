import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusBusOverviewComponent } from './bus-overview/bus-overview.component';
import { BusBusInfoModifyComponent } from './bus-info-modify/bus-info-modify.component';

const routes: Routes = [{ path: 'bus-overview', component: BusBusOverviewComponent },
{ path: 'bus-info-modify', component: BusBusInfoModifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRoutingModule { }

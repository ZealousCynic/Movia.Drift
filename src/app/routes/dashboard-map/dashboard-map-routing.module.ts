import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMapMapComponent } from './map/map.component';
import { DashboardMapMapTestComponent } from './map-test/map-test.component';
import { DashboardMapShowRunningBussesComponent } from './show-running-busses/show-running-busses.component';
import { DashboardMapRunningBusDetailsComponent } from './running-bus-details/running-bus-details.component';

const routes: Routes = [{ path: 'map', component: DashboardMapMapComponent },
{ path: 'map-test', component: DashboardMapMapTestComponent },
{ path: 'show-running-busses', component: DashboardMapShowRunningBussesComponent },
{ path: 'running-bus-details', component: DashboardMapRunningBusDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMapRoutingModule { }

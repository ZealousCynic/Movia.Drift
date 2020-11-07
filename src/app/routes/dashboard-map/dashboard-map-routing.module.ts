import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMapMapComponent } from './map/map.component';
import { DashboardMapMapTestComponent } from './map-test/map-test.component';

const routes: Routes = [{ path: 'map', component: DashboardMapMapComponent },
{ path: 'map-test', component: DashboardMapMapTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMapRoutingModule { }

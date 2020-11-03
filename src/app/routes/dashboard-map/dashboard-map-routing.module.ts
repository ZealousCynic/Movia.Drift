import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMapMapComponent } from './map/map.component';

const routes: Routes = [{ path: 'map', component: DashboardMapMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMapRoutingModule { }

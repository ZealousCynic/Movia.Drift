import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusModelModelOverviewComponent } from './model-overview/model-overview.component';
import { BusModelModelInfoModifyComponent } from './model-info-modify/model-info-modify.component';

const routes: Routes = [{ path: 'model-overview', component: BusModelModelOverviewComponent },
{ path: 'model-info-modify', component: BusModelModelInfoModifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusModelRoutingModule { }

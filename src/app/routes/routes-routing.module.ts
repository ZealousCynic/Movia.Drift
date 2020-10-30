import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AuthGuard } from '@core';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'Sessions' },
      },
  { path: 'animal', loadChildren: () => import('./animal/animal.module').then(m => m.AnimalModule) },
  { path: 'bus-route', loadChildren: () => import('./bus-route/bus-route.module').then(m => m.BusRouteModule) },
  { path: 'bus', loadChildren: () => import('./bus/bus.module').then(m => m.BusModule) },
  { path: 'bus-stop', loadChildren: () => import('./bus-stop/bus-stop.module').then(m => m.BusStopModule) },
  { path: 'bus-driver', loadChildren: () => import('./bus-driver/bus-driver.module').then(m => m.BusDriverModule) },
  { path: 'bus-model', loadChildren: () => import('./bus-model/bus-model.module').then(m => m.BusModelModule) }
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}

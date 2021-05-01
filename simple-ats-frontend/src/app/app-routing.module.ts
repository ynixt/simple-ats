import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './shared/anonymous.guard';
import { PermissionGuard } from './shared/permission.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [PermissionGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
    canActivate: [AnonymousGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

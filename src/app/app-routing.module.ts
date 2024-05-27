import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserModule } from './user/user.module';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { userGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  { path: '', loadChildren: () =>import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'admindashboard',component:AdminDashboardComponent,canActivate:[adminGuardGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: 'userdashboard',component:UserDashboardComponent,canActivate:[userGuardGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

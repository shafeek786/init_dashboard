import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
  { path: '', loadChildren: () =>import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'admindashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: 'userdashboard', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

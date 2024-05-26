import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat/chat.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:'', component:UserListComponent},
  {path:'chat', component:ChatComponent},

 

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

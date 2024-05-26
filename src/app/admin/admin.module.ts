import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './container/header/header.component';
import { FooterComponent } from './container/footer/footer.component';
import { SidebarComponent } from './container/sidebar/sidebar.component';
import { BodyComponent } from './container/body/body.component';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BodyComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }

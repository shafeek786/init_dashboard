import { Component, Input } from '@angular/core';

interface SidenavToggle{
  screenWidth: number
  collapsed: boolean
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isSideNavCollapsed = false
  screenWidth = 0
  onToggleSideNav(data:SidenavToggle):void{
      this.screenWidth = data.screenWidth
      this.isSideNavCollapsed = data.collapsed
  }

}

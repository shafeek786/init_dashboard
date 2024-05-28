import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SidenavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}

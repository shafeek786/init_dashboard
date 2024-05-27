import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData } from 'src/app/user/container/sidebar/nav-data' 

interface SidenavToggle{
  screenWidth: number
  collapsed: boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter()
  collapsed = false
  screenWidth = 0
  navData = navbarData
  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }
  toggleCollapse(){
    console.log("collapse")
    this.collapsed =!this.collapsed
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(){
    this.collapsed =false
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth})

  }
}

import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private service:AuthService){}
  @Input() collapsed = false
  @Input() screenWidth = 0
  logout(){
    this.service.logout()
  }



  getBoddyClass():string{
    let styleClass = ''
    if(this.collapsed && this.screenWidth >768){
      styleClass = 'body-trimmed'
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
      return styleClass
  }
}

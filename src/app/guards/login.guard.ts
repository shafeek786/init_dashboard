import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  currentUrl!:string
  constructor( private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("check 1")
    const token = localStorage.getItem('token')

   console.log("login ay=uth")
    if (token) {
      const decodedToken = jwtDecode(localStorage.getItem('token') as string)

      console.log("check 1")
      const expTimestamp = decodedToken.exp; 
      const currentTimestamp = Math.floor(Date.now() / 1000); 
      if (expTimestamp && expTimestamp < currentTimestamp) {
        console.log("check 2 ")
        localStorage.removeItem('token')
        this.router.navigate(['/']);
        return true;
      } else {
        return false; 
      }

     
    } else {
      console.log("check 3")
      return true; 
    }
  }
}

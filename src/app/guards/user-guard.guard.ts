import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

interface id {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class userGuardGuard implements CanActivate {
  currentUrl!: string;

  constructor(
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.currentUrl = this.router.url;
    if (this.service.isLogin()) {
      if (this.service.getUserRole() === 'user') {
        return true;
      } else {
        this.toastr.warning('You dont have accesss. Please login as user');
        this.service.logout();
        return this.router.parseUrl('/chat');
      }
    }

    return this.router.parseUrl('/');
  }
}

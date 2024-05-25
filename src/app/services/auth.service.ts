import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Environment } from '../environment/environemnt';
import { jwtDecode } from 'jwt-decode';
import { loginData } from '../interfaces/login-data';
import { LoginApiResponse } from '../interfaces/login-api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackbar: MatSnackBar) { }
  apiUrl = Environment.BASE_URL

  verifyLogin(loginData: loginData): Observable<LoginApiResponse> {
    console.log(this.apiUrl)
    return this, this.http.post<LoginApiResponse>(this.apiUrl + '/login', loginData)
  }

  getUserRole() {
    return localStorage.getItem('token') != null ? localStorage.getItem('role') : ''
  }

  isLogin(){
    return localStorage.getItem('token')!=null
    }

    logout(){
      localStorage.removeItem('token')
      this.router.navigate(['/'])
      
      this.snackbar.open('Logout Seccessful', '',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
      })
      }
}

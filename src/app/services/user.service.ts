import { Injectable } from '@angular/core';
import { Environment } from '../environment/environemnt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user, apiResponse, userData } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = Environment.BASE_URL
  constructor(private http: HttpClient
              
  ) { }

  getUser(id:string):Observable<apiResponse>{
    console.log("get user")

    return this.http.get<apiResponse>(this.apiUrl+'/getuser')
  }
}

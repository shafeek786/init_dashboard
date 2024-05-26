import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, userData } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SharedChatService {

  constructor() { }

  private userListSubject = new BehaviorSubject<User[]>([])
  private trainerUnread = new BehaviorSubject<userData>({} as userData)
 
  private checkSubject = new BehaviorSubject<number>(0);
  check$: Observable<number> = this.checkSubject.asObservable();

  updateCheck(data: number): void {
    this.checkSubject.next(data);
  }
  userList$: Observable<User[]> = this.userListSubject.asObservable()
  trainerList$: Observable<userData> = this.trainerUnread.asObservable()

  updateUserList(userList:User[]){
    console.log("data checking shared: "+  userList)
    this.userListSubject.next(userList)
  }

  updateTraienrList(trainerData:userData){
    console.log("shared service:"+ trainerData)
    this.trainerUnread.next(trainerData)
  }
}



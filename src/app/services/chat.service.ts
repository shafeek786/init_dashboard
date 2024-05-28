import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { io,Socket } from 'socket.io-client';
import { StorageData } from '../interfaces/chat';
import { Environment } from '../environment/environemnt';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: Socket;
  private url = Environment.BASE_URL;
  private surl = Environment.BASE_URL
  constructor(private http : HttpClient) {
    this.socket = io(this.surl, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  joinRoom(data: { userId: string; trainerId: string;
  }){
    this.socket.emit('join', data)
  }

  sendMessage(data: { receiverID: string; senderId: string; message:string }): void {
    console.log("message: "+ data.senderId)
    this.socket.emit('message', data);

  }
storemessage(userId:string,receiverId:string,message:string,roomId:string){
  console.log("store"+receiverId)
  return this.http.post(this.url+'/create-new-chat',{userId,receiverId,message,roomId})
}

  getMessage(): Observable<{ user: string; room: string; message: string }> {
    return new Observable<{ user: string; room: string; message: string }>(observer => { 
      this.socket.on('new message', (data) => {
        observer.next(data);
        console.log("received message: "+ data.message)
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  getroomById(myId:string, yourId:string){
    console.log("trainer room:"+ yourId)
    const params = new HttpParams().set('myId',String(myId)).set('yourId',String(yourId))
    return this.http.get(this.url+'/getroom',{ params })
  }
 
  getStorage(roomId:string) {
    const params = new HttpParams().set('roomId', String(roomId))
    return this.http.get(this.url+'/fetch-chatbyid',{ params })
  }

  getAllMessage(userId:string) {
    const params = new HttpParams().set('roomId', String(userId))
    return this.http.get(this.url+'/fetch-chat',{ params })
  }

  setStorage(data: StorageData[]) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

  readMessage(roomId: string, userId: string) {
    console.log("read checksdasadasddsasad: " + roomId, userId);
    const params = new HttpParams().set('roomId', roomId).set('userId', userId);

    return this.http.get(this.url + '/readmessage', { params });
}

sendFile(userId: string, receiverId: string, message: string, roomId: string, file: File) {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('receiverId', receiverId);
  formData.append('message', message);
  formData.append('roomId', roomId);
  formData.append('file', file); // Append the entire file object, not just file name

  return this.http.post(this.url + '/filetochat', formData);
}
}


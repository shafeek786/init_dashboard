import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { apiResponse, user, tokenData } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  decodedToken!: tokenData;
  public userList!: user[];
  public showScreen = false;
  public phone!: string;
  public currentUser!: any;
  public selectedUser: any;
  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string; message: string }[] = [];
  public storageArray: any[] = [];
  selectedFile: File | null = null;
  check: number = 0;
  constructor(
    private chatService: ChatService,
    private service: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('token') as string);
    this.currentUser = this.decodedToken.id;
    this.getUser();

    this.chatService
      .getMessage()
      .subscribe((data: { user: string; room: string; message: string }) => {
        if (this.roomId) {
          this.getUser();
          setTimeout(() => {
            this.chatService.getStorage(this.roomId).subscribe((res: any) => {
              console.log('res:' + res.chats);
              this.storageArray = res.chats;
            });
            console.log('data' + this.storageArray);
            const storeIndex = this.storageArray.findIndex(
              (storage: {
                roomId: string;
                chats: { user: string; message: string }[];
              }) => storage.roomId === this.roomId
            );
            if (storeIndex > -1) {
              this.messageArray = this.storageArray[storeIndex].chats;
            }
          }, 500);
        }
      });
  }
  readMessage(roomId: string, selectedUserId: string) {
    this.chatService.readMessage(roomId, selectedUserId).subscribe(
      () => {
        console.log('Message read successfully.');
      },
      (error) => {
        console.error('Error reading message:', error);
      }
    );
  }

  getUser() {
    console.log('trainerId:' + this.decodedToken.id);
    this.service.getUser(this.decodedToken.id).subscribe((res: apiResponse) => {
      this.userList = res.userData;
      console.log('trainser side user: ' + res);
    });
  }
  getUser2() {
    console.log('trainerId:' + this.decodedToken.id);
    this.service.getUser(this.decodedToken.id).subscribe((res: apiResponse) => {
      this.userList = res.userData;
      console.log('trainser side user: ' + res);
    });
  }

  selectUserHandler(userId: string): void {
    this.getUser();
    this.selectedUser = this.userList.find((user) => user._id === userId);
    console.log('selected trainer: ' + this.selectedUser._id);
    this.readMessage(this.selectedUser._id, this.decodedToken.id);
    this.messageArray = [];
    this.chatService
      .getroomById(this.decodedToken.id, this.selectedUser._id)
      .subscribe((res: any) => {
        this.roomId = res.roomDetails._id;
        this.readMessage(this.roomId, this.decodedToken.id);
        this.chatService.getStorage(this.roomId).subscribe((res: any) => {
          this.storageArray = res.chats;
          console.log('storage: ' + this.storageArray);
        });
      });

    const storeIndex = this.storageArray.findIndex(
      (storage) => storage.roomId === this.roomId
    );
    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }
    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({
      userId: username,
      trainerId: this.decodedToken.id,
    });
  }

  sendMessage(): void {
    console.log('send check');
    this.chatService.sendMessage({
      senderId: this.selectedUser._id,
      receiverID: this.decodedToken.id,
      message: this.messageText,
    });
    this.chatService
      .storemessage(
        this.decodedToken.id,
        this.selectedUser._id,
        this.messageText,
        this.roomId
      )
      .subscribe((res: any) => {});
    this.chatService.getStorage(this.roomId).subscribe((res: any) => {
      this.storageArray = res.chats;
    });
    console.log(this.storageArray);
    const storeIndex = this.storageArray.findIndex(
      (storage) => storage.roomId === this.roomId
    );
    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText,
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [
          {
            user: this.currentUser.name,
            message: this.messageText,
          },
        ],
      };
      this.storageArray.push(updateStorage);
    }
    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.chatService
        .sendFile(
          this.decodedToken.id,
          this.selectedUser._id,
          this.messageText,
          this.roomId,
          this.selectedFile
        )
        .subscribe(
          (res) => {
            console.log('File uploaded successfully:', res);
            event.target.value = null;
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
    }
  }
}

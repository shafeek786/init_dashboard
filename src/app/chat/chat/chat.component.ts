import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User,TokenData,userData } from 'src/app/interfaces/user';
import { ChatService } from 'src/app/services/chat.service'; 
import { SharedChatService } from '../../services/shared-chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string; message: string }[] = [];
  public storageArray: any[] = [];
  public allMessage: any[] = []
  public unreadCounts: { _id: any; count: number }[] = [];
  public userList2!: User[]

  public showScreen = false;
  public phone!: string;
  public currentUser: any;
  public selectedUser: any;
  decodedToken!: TokenData;
  unreadCount:number  = 1
  public userList!: User;
  notifications: any;

  constructor(
    private chatService: ChatService,
    private trainerService: UserService,
    private SharedChatService:SharedChatService,
    private service: UserService
  ) {}
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

  scrollToBottom(): void {
    try {
      console.log("Before scroll:", this.chatContainer.nativeElement.scrollTop, this.chatContainer.nativeElement.scrollHeight);
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      console.log("After scroll:", this.chatContainer.nativeElement.scrollTop, this.chatContainer.nativeElement.scrollHeight);
      
    } catch(err) { }
  }

  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('token') as string);
    this.getAllMessage()
    this.currentUser = this.decodedToken.id;
    this.getTrainer();
    this.getUserUpdate()
   
   

    console.log("Before subscribing to trainerList$");
    this.SharedChatService.trainerList$.subscribe((res: userData) => {
      console.log("Subscription triggered. Received data:", res);
      this.unreadCounts = res.unreadCounts;
      this.getUnreadMessageCount();
    });
    this.chatService
      .getMessage()
      .subscribe((data: { user: string; room: string; message: string }) => {
        if (this.roomId) {
              this.getTrainer()
           

          setTimeout(() => {
            this.getUserUpdate()
            this.chatService.getStorage(this.roomId).subscribe((res: any) => {
              console.log('res:' + res.chats);
              this.storageArray = res.chats;
              
            });
          }, 500);
        }
      });

      
    
  }
  getAllMessage(){
    this.chatService.getAllMessage(this.decodedToken.id).subscribe((res:any)=>{
      this.allMessage = res.chats
    })
  }
  getTrainer() {
    this.service
      .getUser(this.decodedToken.id)
      .subscribe((res: userData) => {

        this.userList= res.trainerData
        this.unreadCounts = res.unreadCounts
        console.log('traienrrr: ' + this.userList);
        this.getUnreadMessageCount()
      });
  }

  getUserUpdate() {
    console.log("trainerId:" + this.decodedToken.id);
    this.service.getUser(this.selectedUser).subscribe((res: any) => {
      this.userList2 = res.userData;
      console.log("trainser side user: ", res);
      console.log("trainser side user: ", this.userList2);
      console.log("trainser side user: ", res.userData);
      console.log("to shared service: "+res.userData)
      this.SharedChatService.updateUserList(res.userData)
      // If userData is an object, log its properties individually
      console.log("userData firstName:", res.userData.name);
      console.log("userData email:", res.userData.email);
      // Add more properties as needed
    });
  }

  getUnreadMessageCount() {
    console.log("hjkhjkdgh"+ this.userList)
      const unreadMessageObj = this.unreadCounts.find((count) => count._id === this.userList._id);
   
    this.unreadCount =  unreadMessageObj ? unreadMessageObj.count : 0;
    console.log("count :"+this.unreadCount)
}


  
  selectUserHandler(trainerId: string): void {
    this.scrollToBottom()

    this.getTrainer()

    this.selectedUser = this.userList._id
    console.log('selected trainer: ' + this.selectedUser
    );
    this.messageArray = [];
    this.chatService
      .getroom(this.decodedToken.id, this.selectedUser)
      .subscribe((res: any) => {
        this.roomId = res.roomDetails._id;

        this.chatService.getStorage(this.roomId).subscribe((res: any) => {
          this.storageArray = res.chats;
          console.log('dataaa' + this.storageArray);
      });

      this.readMessage(this.roomId,this.decodedToken.id)
 
    });

    console.log('dataaa' + this.storageArray);

    console.log('room: ' + this.roomId);
    console.log('data' + this.storageArray);
    const storeIndex = this.storageArray.findIndex(
      (storage) => storage.roomId === this.roomId
    );

   

    this.join(this.currentUser, this.selectedUser._id);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({
      userId: username,
      trainerId: this.selectedUser,
    });
  }
 
  getUnreadNotificationCount(trainerId: string): number {
    return this.storageArray.filter((notification: { sender: string; is_read: any }) => 
        notification.sender === trainerId && !notification.is_read
    ).length;
}

readMessage(roomId:string,userId: string) {
  this.chatService.readMessage(roomId,userId).subscribe(() => {
    console.log("Message read successfully.");
  }, (error) => {
    console.error("Error reading message:", error);
  });
}

  sendMessage(): void {
    console.log("hiiii")
    this.SharedChatService.updateCheck(200)

    console.log("message:  "+this.messageText);
    this.chatService.sendMessage({
      userID: this.decodedToken.id,
      trainerId: this.selectedUser._id,
      message: this.messageText,
    });
    this.chatService
      .storemessage(this.decodedToken.id, this.messageText, this.roomId)
      .subscribe((res: any) => {});
    this.chatService.getStorage(this.roomId).subscribe((res: any) => {
      this.storageArray = res.chats;
    });
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
    this.getUserUpdate()
    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }
  
}

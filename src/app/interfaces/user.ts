export interface User {
    name:string,
    emailId:string,
    mobile:number
}

export  interface userId{
    _id:string
  }

  export interface TokenData {
    id: string;
    name: string;
    email: string;
  
  }
  export interface userData {
    trainerData: User
    message: string
    unreadCounts:{ _id: string; count: number }[] 
  }
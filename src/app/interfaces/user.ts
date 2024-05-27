export interface User {
    _id:string
    name:string,
    email:string,
    mobile:number,
    unreadMessageCount:number
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
    userData: User
    message: string
    unreadCounts:{ _id: string; count: number }[] 
  }

  export interface apiResponse{
    userData:User,
    unreadCounts:number
  }
export interface user {
    _id:string
    name:string,
    email:string,
    mobile:number,
    unreadMessageCount:number
}

export  interface userId{
    _id:string
  }

  export interface tokenData {
    id: string;
    name: string;
    email: string;
  
  }
  export interface userData {
    userData: user
    message: string
    unreadCounts:{ _id: string; count: number }[] 
  }

  export interface apiResponse{
    userData:user[],
    unreadCounts:number
  }
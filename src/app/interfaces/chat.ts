export interface Chat {
}

export interface StorageData {
    roomId: string;
    chats: { user: string; message: string }[];
  }

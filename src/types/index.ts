export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
}

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'audio' | 'document' | 'voice';
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  chatId: string;
  mediaUrl?: string;
  fileName?: string;
  fileSize?: number;
  duration?: number; // for audio/voice messages
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  type: 'one-to-one' | 'group';
  name: string;
  participants: string[];
  lastMessage?: Message;
  lastMessageTime?: Date;
  unreadCount: number;
  isGroup: boolean;
  groupAvatar?: string;
  createdAt: Date;
  createdBy: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'text' | 'image' | 'audio' | 'document' | 'voice';
  senderId: string;
  timestamp: Date;
  chatId: string;
  mediaUrl?: string;
  fileName?: string;
  fileSize?: number;
  duration?: number;
  isRead: boolean;
}

export interface MediaFile {
  file: File;
  type: 'image' | 'audio' | 'document';
  preview?: string;
  uploadProgress?: number;
} 
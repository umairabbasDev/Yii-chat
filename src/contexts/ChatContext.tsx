import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  listenToChatRooms, 
  sendMessage as sendMessageAPI, 
  createChatRoom as createChatRoomAPI,
  listenToMessages
} from '../lib/firebase';
import { ChatRoom, Message } from '../types';
import { useAuth } from './AuthContext';

interface ChatContextType {
  chatRooms: ChatRoom[];
  currentChat: ChatRoom | null;
  messages: Message[];
  setCurrentChat: (chat: ChatRoom | null) => void;
  sendMessage: (content: string, type: string, mediaUrl?: string, fileName?: string, fileSize?: number, duration?: number) => Promise<void>;
  createChatRoom: (participants: string[], name?: string, isGroup?: boolean) => Promise<string>;
  loading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to chat rooms
  useEffect(() => {
    if (!currentUser) {
      setChatRooms([]);
      setLoading(false);
      return;
    }

    console.log('Setting up chat rooms listener for user:', currentUser.uid);
    
    const unsubscribe = listenToChatRooms(currentUser.uid, (rooms) => {
      console.log('Received chat rooms:', rooms);
      setChatRooms(rooms);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  // Listen to messages for current chat
  useEffect(() => {
    if (!currentChat) {
      console.log('No current chat, clearing messages');
      setMessages([]);
      return;
    }

    console.log('Setting up messages listener for chat:', currentChat.id);
    console.log('Current chat details:', currentChat);
    
    const unsubscribe = listenToMessages(currentChat.id, (msgs) => {
      console.log('Received messages from Firebase:', msgs);
      console.log('Messages count:', msgs.length);
      console.log('First message:', msgs[0]);
      console.log('Last message:', msgs[msgs.length - 1]);
      setMessages(msgs);
    });

    return unsubscribe;
  }, [currentChat]);

  const sendMessage = async (
    content: string, 
    type: string, 
    mediaUrl?: string, 
    fileName?: string, 
    fileSize?: number, 
    duration?: number
  ) => {
    if (!currentChat || !currentUser) {
      console.log('Cannot send message:', { currentChat: !!currentChat, currentUser: !!currentUser });
      return;
    }

    console.log('Sending message:', { content, type, mediaUrl, fileName, fileSize, duration });
    console.log('To chat:', currentChat.id);
    console.log('From user:', currentUser.uid);

    try {
      const result = await sendMessageAPI(
        content,
        type,
        currentUser.uid,
        currentUser.displayName || 'Unknown User',
        currentUser.photoURL || '',
        currentChat.id,
        mediaUrl,
        fileName,
        fileSize,
        duration
      );

      console.log('Send message result:', result);

      if (!result.success) {
        console.error('Failed to send message:', result.error);
      } else {
        console.log('Message sent successfully with ID:', result.messageId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createChatRoom = async (participants: string[], name?: string, isGroup: boolean = false) => {
    if (!currentUser) throw new Error('User not authenticated');

    try {
      const result = await createChatRoomAPI(
        participants,
        name || 'New Chat',
        isGroup,
        currentUser.uid
      );

      if (result.success && result.chatRoomId) {
        return result.chatRoomId;
      } else {
        throw new Error('Failed to create chat room');
      }
    } catch (error) {
      console.error('Error creating chat room:', error);
      throw error;
    }
  };

  const value: ChatContextType = {
    chatRooms,
    currentChat,
    messages,
    setCurrentChat,
    sendMessage,
    createChatRoom,
    loading
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 
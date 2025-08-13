import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
  doc,
  updateDoc,
  getDocs,
  limit,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { ChatRoom, Message, User } from "../../types";

// Chat Room Functions
export const createChatRoom = async (
  participants: string[],
  name: string,
  isGroup: boolean = false,
  createdBy: string
): Promise<
  { success: true; chatRoomId: string } | { success: false; error: string }
> => {
  try {
    console.log("Creating chat room with:", {
      participants,
      name,
      isGroup,
      createdBy,
    });

    const chatRoomData = {
      type: isGroup ? "group" : "one-to-one",
      name: name || "",
      participants: participants,
      lastMessage: null,
      lastMessageTime: serverTimestamp(),
      unreadCount: 0,
      groupAvatar: "",
      createdAt: serverTimestamp(),
      createdBy: createdBy,
      updatedAt: serverTimestamp(),
    };

    console.log("Chat room data to be saved:", chatRoomData);

    const docRef = await addDoc(collection(db, "chatRooms"), chatRoomData);
    console.log("Chat room created with ID:", docRef.id);

    return { success: true, chatRoomId: docRef.id };
  } catch (error: any) {
    console.error("Error creating chat room:", error);
    return { success: false, error: error.message };
  }
};

export const getChatRooms = async (
  userId: string
): Promise<
  { success: true; chatRooms: ChatRoom[] } | { success: false; error: string }
> => {
  try {
    // First, try to get chat rooms with ordering
    const q = query(
      collection(db, "chatRooms"),
      where("participants", "array-contains", userId),
      orderBy("lastMessageTime", "desc")
    );

    const snapshot = await getDocs(q);
    const rooms: ChatRoom[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      rooms.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as unknown as ChatRoom);
    });

    return { success: true, chatRooms: rooms };
  } catch (error: any) {
    // If ordering fails (e.g., no documents), try without ordering
    if (error.code === "failed-precondition") {
      try {
        const fallbackQuery = query(
          collection(db, "chatRooms"),
          where("participants", "array-contains", userId)
        );

        const snapshot = await getDocs(fallbackQuery);
        const rooms: ChatRoom[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          rooms.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as unknown as ChatRoom);
        });

        // Sort manually
        rooms.sort((a, b) => {
          const timeA = a.lastMessageTime?.getTime() || 0;
          const timeB = b.lastMessageTime?.getTime() || 0;
          return timeB - timeA;
        });

        return { success: true, chatRooms: rooms };
      } catch (fallbackError: any) {
        return { success: false, error: fallbackError.message };
      }
    }

    return { success: false, error: error.message };
  }
};

export const listenToChatRooms = (
  userId: string,
  callback: (rooms: ChatRoom[]) => void
) => {
  try {
    // First, try to get chat rooms with ordering
    const q = query(
      collection(db, "chatRooms"),
      where("participants", "array-contains", userId),
      orderBy("lastMessageTime", "desc")
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const rooms: ChatRoom[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          rooms.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as unknown as ChatRoom);
        });
        callback(rooms);
      },
      (error) => {
        console.error("Error in chat rooms listener:", error);
        // If ordering fails (e.g., no documents), try without ordering
        if (error.code === "failed-precondition") {
          console.log("Falling back to unordered query");
          const fallbackQuery = query(
            collection(db, "chatRooms"),
            where("participants", "array-contains", userId)
          );

          return onSnapshot(fallbackQuery, (snapshot) => {
            const rooms: ChatRoom[] = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              rooms.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
              } as unknown as ChatRoom);
            });
            // Sort manually
            rooms.sort((a, b) => {
              const timeA = a.lastMessageTime?.getTime() || 0;
              const timeB = b.lastMessageTime?.getTime() || 0;
              return timeB - timeA;
            });
            callback(rooms);
          });
        }
      }
    );
  } catch (error: any) {
    console.error("Error setting up chat rooms listener:", error);
    return () => {};
  }
};

export const getChatRoom = async (chatRoomId: string) => {
  try {
    const chatDoc = await getDocs(
      query(collection(db, "chatRooms"), where("__name__", "==", chatRoomId))
    );

    if (!chatDoc.empty) {
      const doc = chatDoc.docs[0];
      const data = doc.data();
      return {
        success: true,
        chatRoom: {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as unknown as ChatRoom,
      };
    }

    return { success: false, error: "Chat room not found" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateChatRoom = async (
  chatRoomId: string,
  updates: Partial<ChatRoom>
) => {
  try {
    const chatRef = doc(db, "chatRooms", chatRoomId);
    await updateDoc(chatRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteChatRoom = async (chatRoomId: string) => {
  try {
    await deleteDoc(doc(db, "chatRooms", chatRoomId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Message Functions - NEW ARCHITECTURE using subcollections
export const sendMessage = async (
  content: string,
  type: string,
  senderId: string,
  senderName: string,
  senderAvatar: string,
  chatId: string,
  mediaUrl?: string,
  fileName?: string,
  fileSize?: number,
  duration?: number
) => {
  try {
    console.log("Firebase sendMessage called with:", {
      content,
      type,
      senderId,
      senderName,
      senderAvatar,
      chatId,
      mediaUrl,
      fileName,
      fileSize,
      duration,
    });

    // Create message in the chat's subcollection
    const messageData = {
      content,
      type,
      senderId,
      senderName,
      senderAvatar,
      timestamp: serverTimestamp(),
      isRead: false,
    };
    // mediaUrl,
    // fileName,
    // fileSize,
    // duration,

    console.log("Message data to be saved:", messageData);

    // Save message to chatRooms/{chatId}/messages subcollection
    const messagesRef = collection(db, "chatRooms", chatId, "messages");
    const messageRef = await addDoc(messagesRef, messageData);
    console.log("Message saved to subcollection with ID:", messageRef.id);

    // Update chat room's last message
    const chatRef = doc(db, "chatRooms", chatId);
    await updateDoc(chatRef, {
      lastMessage: {
        id: messageRef.id,
        content,
        type,
        senderId,
        senderName,
        senderAvatar,
        timestamp: messageData.timestamp,
        mediaUrl,
        fileName,
        fileSize,
        duration,
        isRead: false,
      },
      lastMessageTime: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Chat room updated with last message");

    return { success: true, messageId: messageRef.id };
  } catch (error: any) {
    console.error("Error in Firebase sendMessage:", error);
    return { success: false, error: error.message };
  }
};

export const getMessages = async (chatId: string, limitCount: number = 50) => {
  try {
    // Query messages from the chat's subcollection
    const messagesRef = collection(db, "chatRooms", chatId, "messages");
    const q = query(
      messagesRef,
      orderBy("timestamp", "desc"),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    const messages: Message[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        chatId, // Add chatId since it's not in the subcollection document
        ...data,
        timestamp: data.timestamp?.toDate() || new Date(),
      } as Message);
    });

    // Reverse to get chronological order
    messages.reverse();

    return { success: true, messages };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const listenToMessages = (
  chatId: string,
  callback: (messages: Message[]) => void
) => {
  try {
    console.log("Setting up messages listener for chat:", chatId);

    // Listen to messages from the chat's subcollection
    const messagesRef = collection(db, "chatRooms", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    console.log("Messages query created:", q);

    return onSnapshot(
      q,
      (snapshot) => {
        console.log("Messages snapshot received:", snapshot.size, "documents");

        const messages: Message[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Message document:", doc.id, data);
          messages.push({
            id: doc.id,
            chatId, // Add chatId since it's not in the subcollection document
            ...data,
            timestamp: data.timestamp?.toDate() || new Date(),
          } as Message);
        });

        console.log("Processed messages:", messages);
        callback(messages);
      },
      (error) => {
        console.error("Error in messages listener:", error);
      }
    );
  } catch (error: any) {
    console.error("Error setting up messages listener:", error);
    return () => {};
  }
};

export const markMessageAsRead = async (chatId: string, messageId: string) => {
  try {
    const messageRef = doc(db, "chatRooms", chatId, "messages", messageId);
    await updateDoc(messageRef, { isRead: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteMessage = async (chatId: string, messageId: string) => {
  try {
    await deleteDoc(doc(db, "chatRooms", chatId, "messages", messageId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc,
  writeBatch,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Migration script to move messages from flat collection to subcollections
 * Run this once to migrate your existing data structure
 */
export const migrateMessagesToSubcollections = async () => {
  try {
    console.log('Starting message migration...');
    
    // Get all existing messages from the old flat structure
    const oldMessagesRef = collection(db, 'messages');
    const oldMessagesQuery = query(oldMessagesRef, orderBy('timestamp', 'asc'));
    const oldMessagesSnapshot = await getDocs(oldMessagesQuery);
    
    console.log(`Found ${oldMessagesSnapshot.size} messages to migrate`);
    
    if (oldMessagesSnapshot.empty) {
      console.log('No messages to migrate');
      return { success: true, migratedCount: 0 };
    }
    
    // Group messages by chatId
    const messagesByChat: { [chatId: string]: any[] } = {};
    
    oldMessagesSnapshot.forEach((doc) => {
      const data = doc.data();
      const chatId = data.chatId;
      
      if (!messagesByChat[chatId]) {
        messagesByChat[chatId] = [];
      }
      
      messagesByChat[chatId].push({
        id: doc.id,
        ...data
      });
    });
    
    console.log(`Messages grouped into ${Object.keys(messagesByChat).length} chats`);
    
    // Migrate messages to subcollections
    let migratedCount = 0;
    const batch = writeBatch(db);
    
    for (const [chatId, messages] of Object.entries(messagesByChat)) {
      console.log(`Migrating ${messages.length} messages for chat ${chatId}`);
      
      for (const message of messages) {
        try {
          // Add message to subcollection
          const newMessageRef = collection(db, 'chatRooms', chatId, 'messages');
          await addDoc(newMessageRef, {
            content: message.content,
            type: message.type,
            senderId: message.senderId,
            senderName: message.senderName,
            senderAvatar: message.senderAvatar,
            timestamp: message.timestamp,
            mediaUrl: message.mediaUrl,
            fileName: message.fileName,
            fileSize: message.fileSize,
            duration: message.duration,
            isRead: message.isRead
          });
          
          // Mark old message for deletion
          batch.delete(doc(db, 'messages', message.id));
          migratedCount++;
          
        } catch (error: any) {
          console.error(`Failed to migrate message ${message.id}:`, error);
        }
      }
    }
    
    // Commit all deletions
    await batch.commit();
    console.log(`Successfully migrated ${migratedCount} messages`);
    
    return { success: true, migratedCount };
    
  } catch (error: any) {
    console.error('Migration failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Verify migration by checking message counts
 */
export const verifyMigration = async () => {
  try {
    // Count old messages
    const oldMessagesRef = collection(db, 'messages');
    const oldMessagesSnapshot = await getDocs(oldMessagesRef);
    const oldCount = oldMessagesSnapshot.size;
    
    // Count new messages in subcollections
    let newCount = 0;
    const chatRoomsRef = collection(db, 'chatRooms');
    const chatRoomsSnapshot = await getDocs(chatRoomsRef);
    
    for (const chatDoc of chatRoomsSnapshot.docs) {
      const messagesRef = collection(db, 'chatRooms', chatDoc.id, 'messages');
      const messagesSnapshot = await getDocs(messagesRef);
      newCount += messagesSnapshot.size;
    }
    
    console.log(`Migration verification: Old messages: ${oldCount}, New messages: ${newCount}`);
    
    return {
      oldCount,
      newCount,
      isComplete: oldCount === 0 && newCount > 0
    };
    
  } catch (error: any) {
    console.error('Verification failed:', error);
    return { error: error.message };
  }
}; 
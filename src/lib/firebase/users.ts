import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  onSnapshot,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User } from '../../types';

export const searchUsers = async (searchTerm: string, currentUserId: string) => {
  try {
    console.log('Searching for users with term:', searchTerm, 'excluding user:', currentUserId);
    
    let q;
    
    if (searchTerm.trim() === '') {
      // If no search term, get all users (useful for testing)
      q = query(
        collection(db, 'users'),
        limit(20)
      );
    } else {
      // Use range query for specific search terms
      q = query(
        collection(db, 'users'),
        where('displayName', '>=', searchTerm),
        where('displayName', '<=', searchTerm + '\uf8ff'),
        limit(20)
      );
    }

    const snapshot = await getDocs(q);
    console.log('Found', snapshot.size, 'users in search');
    
    const users: User[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log('User document:', doc.id, data);
      
      // Don't include current user in search results
      if (doc.id !== currentUserId) {
        users.push({
          uid: doc.id, // Use doc.id as uid
          email: data.email || '',
          displayName: data.displayName || 'Unknown User',
          photoURL: data.photoURL || '',
          status: data.status || 'offline',
          lastSeen: data.lastSeen?.toDate() || new Date()
        });
      }
    });

    console.log('Returning', users.length, 'filtered users');
    return { success: true, users };
  } catch (error: any) {
    console.error('Error in searchUsers:', error);
    return { success: false, error: error.message };
  }
};

export const getOnlineUsers = async () => {
  try {
    const q = query(
      collection(db, 'users'),
      where('status', '==', 'online'),
      orderBy('lastSeen', 'desc')
    );

    const snapshot = await getDocs(q);
    const users: User[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        ...data,
        lastSeen: data.lastSeen?.toDate() || new Date()
      } as unknown as User);
    });

    return { success: true, users };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const listenToOnlineUsers = (callback: (users: User[]) => void) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('status', '==', 'online'),
      orderBy('lastSeen', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const users: User[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          ...data,
          lastSeen: data.lastSeen?.toDate() || new Date()
        } as unknown as User);
      });
      callback(users);
    });
  } catch (error: any) {
    console.error('Error listening to online users:', error);
    return () => {};
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      lastSeen: new Date()
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserById = async (userId: string) => {
  try {
    const userDoc = await getDocs(query(
      collection(db, 'users'),
      where('__name__', '==', userId)
    ));
    
    if (!userDoc.empty) {
      const doc = userDoc.docs[0];
      const data = doc.data();
              return {
          success: true,
          user: {
            id: doc.id,
            ...data,
            lastSeen: data.lastSeen?.toDate() || new Date()
          } as unknown as User
        };
    }
    
    return { success: false, error: 'User not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUsersByIds = async (userIds: string[]) => {
  try {
    const users: User[] = [];
    
    for (const userId of userIds) {
      const result = await getUserById(userId);
      if (result.success && result.user) {
        users.push(result.user);
      }
    }
    
    return { success: true, users };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}; 
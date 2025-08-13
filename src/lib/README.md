# Firebase API Library

This directory contains all Firebase-related functions organized in a clean, maintainable structure. It serves as the single source of truth for all Firebase operations in the application.

## Structure

```
src/lib/
├── firebase/
│   ├── auth.ts      # Authentication functions
│   ├── chat.ts      # Chat room and message functions
│   ├── users.ts     # User management functions
│   └── index.ts     # Main Firebase API exports
└── index.ts         # Main library exports
```

## Usage

### Importing Functions

```typescript
// Import specific functions
import { signIn, createChatRoom, sendMessage } from '../lib/firebase';

// Or import everything
import * as FirebaseAPI from '../lib/firebase';
```

### Authentication

```typescript
import { signIn, signUp, signOutUser } from '../lib/firebase';

// Sign in
const result = await signIn(email, password);
if (result.success) {
  // User signed in successfully
} else {
  console.error(result.error);
}

// Sign up
const result = await signUp(email, password, displayName);
if (result.success) {
  // User created successfully
} else {
  console.error(result.error);
}

// Sign out
const result = await signOutUser();
```

### Chat Operations

```typescript
import { createChatRoom, sendMessage, listenToChatRooms } from '../lib/firebase';

// Create a chat room
const result = await createChatRoom(participants, name, isGroup, currentUserId);
if (result.success) {
  const chatRoomId = result.chatRoomId;
}

// Send a message
const result = await sendMessage(
  content,
  type,
  senderId,
  senderName,
  senderAvatar,
  chatId,
  mediaUrl,
  fileName,
  fileSize,
  duration
);

// Listen to chat rooms (real-time updates)
const unsubscribe = listenToChatRooms(userId, (rooms) => {
  console.log('Chat rooms updated:', rooms);
});

// Clean up listener
unsubscribe();
```

### User Management

```typescript
import { searchUsers, updateUserProfile, getUserById } from '../lib/firebase';

// Search users
const result = await searchUsers(searchTerm, currentUserId);
if (result.success) {
  const users = result.users;
}

// Update user profile
const result = await updateUserProfile(userId, { status: 'online' });

// Get user by ID
const result = await getUserById(userId);
if (result.success) {
  const user = result.user;
}
```

## Error Handling

All functions return a consistent response format:

```typescript
// Success case
{ success: true, data: resultData }

// Error case
{ success: false, error: errorMessage }
```

## Real-time Listeners

Functions that start with `listenTo` return an unsubscribe function that should be called when the component unmounts:

```typescript
useEffect(() => {
  const unsubscribe = listenToChatRooms(userId, callback);
  
  return () => {
    unsubscribe(); // Clean up listener
  };
}, [userId]);
```

## Security Rules

Make sure to deploy the `firestore.rules` file to your Firebase project to ensure proper access control.

## Best Practices

1. **Always handle errors**: Check the `success` property before using the result
2. **Clean up listeners**: Call the unsubscribe function returned by listener functions
3. **Use TypeScript**: All functions are properly typed for better development experience
4. **Consistent API**: All functions follow the same pattern for consistency 
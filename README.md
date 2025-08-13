# Yii Chat - Modern Chat Application

A feature-rich, real-time chat application built with React, TypeScript, Material-UI, and Firebase. This application supports one-to-one and group chats with media sharing capabilities.

## 🚀 Features

### Core Chat Features
- **One-to-One Chat**: Direct messaging between two users
- **Group Chat**: Multi-user group conversations
- **Real-time Messaging**: Instant message delivery using Firebase
- **Message Types**: Support for text, images, audio, voice notes, and documents
- **Unread Message Counts**: Track unread messages per chat
- **Message Timestamps**: See when messages were sent

### Media Sharing
- **Image Sharing**: Upload and share images (JPEG, PNG, GIF, WebP)
- **Audio Files**: Share audio files (MP3, WAV, OGG, M4A)
- **Documents**: Share PDFs, Word documents, and text files
- **Voice Notes**: Record and send voice messages
- **File Preview**: Preview images and file information

### User Experience
- **Modern UI**: Beautiful Material-UI design with responsive layout
- **User Authentication**: Secure login/signup with Firebase Auth
- **User Profiles**: Display names, avatars, and online status
- **Chat Search**: Find conversations quickly
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Customizable theme support

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Firebase Integration**: Real-time database, authentication, and storage
- **Context API**: Efficient state management
- **Real-time Updates**: Live chat updates using Firebase listeners
- **File Upload**: Drag & drop file sharing
- **Voice Recording**: Browser-based audio recording

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Framework**: Material-UI (MUI) 5
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons
- **File Handling**: React Dropzone
- **Date Formatting**: date-fns

## 📋 Prerequisites

Before running this application, you need:

1. **Node.js** (version 16 or higher)
2. **npm** or **pnpm** package manager
3. **Firebase Project** with Firestore and Storage enabled

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yii-chat
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Get your Firebase config

4. **Configure Firebase**
   - Open `src/config/firebase.ts`
   - Replace the placeholder config with your Firebase project details:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

5. **Firestore Rules**
   Set up the following Firestore security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Chat rooms - users can read/write if they're participants
       match /chatRooms/{chatId} {
         allow read, write: if request.auth != null && 
           request.auth.uid in resource.data.participants;
       }
       
       // Messages - users can read/write if they're in the chat
       match /messages/{messageId} {
         allow read, write: if request.auth != null && 
           request.auth.uid in get(/databases/$(database)/documents/chatRooms/$(resource.data.chatId)).data.participants;
       }
     }
   }
   ```

6. **Storage Rules**
   Set up Firebase Storage rules:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 🚀 Running the Application

1. **Development Mode**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

2. **Build for Production**
   ```bash
   pnpm build
   # or
   npm run build
   ```

3. **Preview Production Build**
   ```bash
   pnpm preview
   # or
   npm run preview
   ```

## 📱 Usage

### Getting Started
1. **Sign Up**: Create a new account with email and password
2. **Sign In**: Log in with your credentials
3. **Create Chat**: Start a new one-to-one or group chat
4. **Send Messages**: Type text or share media files
5. **Voice Notes**: Record and send voice messages

### Chat Features
- **Text Messages**: Type and send text messages
- **Media Sharing**: Drag & drop files or use the attachment button
- **Voice Recording**: Click the microphone button to record voice notes
- **File Types**: Support for images, audio, documents, and voice notes
- **Real-time Updates**: See messages as they arrive

### User Management
- **Profile**: View and edit your profile information
- **Status**: Set your online/offline status
- **Logout**: Securely sign out of the application

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat-related components
│   └── Dashboard.tsx   # Main dashboard
├── contexts/           # React contexts
├── config/            # Configuration files
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🔒 Security Features

- **Authentication**: Firebase Auth with email/password
- **Authorization**: Users can only access their own chats
- **Data Validation**: TypeScript types ensure data integrity
- **Secure Rules**: Firestore and Storage security rules

## 🚧 Future Enhancements

- [ ] **Push Notifications**: Real-time push notifications
- [ ] **Video Calls**: WebRTC integration
- [ ] **Message Encryption**: End-to-end encryption
- [ ] **File Compression**: Automatic image compression
- [ ] **Message Reactions**: Like, love, laugh reactions
- [ ] **Message Threading**: Reply to specific messages
- [ ] **User Status**: Custom status messages
- [ ] **Chat Backup**: Export chat history
- [ ] **Multi-language**: Internationalization support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the Firebase configuration
2. Verify Firestore and Storage rules
3. Check browser console for errors
4. Ensure all dependencies are installed
5. Create an issue in the repository

## 🙏 Acknowledgments

- **Material-UI** for the beautiful component library
- **Firebase** for the robust backend services
- **React** team for the amazing framework
- **Vite** for the fast build tool

---

**Happy Chatting! 🎉**

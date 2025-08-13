// Firebase API - Single source of truth for Firebase operations

// Auth functions
export * from './auth';

// Chat functions
export * from './chat';

// User management functions
export * from './users';

// Re-export Firebase config for convenience
export { auth, db, storage } from '../../config/firebase'; 
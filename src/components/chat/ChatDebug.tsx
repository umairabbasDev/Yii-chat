import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { migrateMessagesToSubcollections, verifyMigration } from '../../lib/firebase/migrate';

export const ChatDebug: React.FC = () => {
  const { chatRooms, currentChat, messages, sendMessage, createChatRoom } = useChat();
  const { currentUser } = useAuth();
  const [testMessage, setTestMessage] = useState('Hello World!');
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);
  const [migrating, setMigrating] = useState(false);

  const createTestChat = async () => {
    if (!currentUser) return;
    
    try {
      console.log('Creating test chat...');
      const chatId = await createChatRoom([currentUser.uid], 'Test Chat', false);
      console.log('Test chat created with ID:', chatId);
    } catch (error) {
      console.error('Failed to create test chat:', error);
    }
  };

  const sendTestMessage = async () => {
    if (!currentChat) {
      console.log('No current chat selected');
      return;
    }
    
    try {
      console.log('Sending test message...');
      await sendMessage(testMessage, 'text');
      console.log('Test message sent');
    } catch (error) {
      console.error('Failed to send test message:', error);
    }
  };

  const runMigration = async () => {
    if (!currentUser) return;
    
    setMigrating(true);
    setMigrationStatus('Starting migration...');
    
    try {
      const result = await migrateMessagesToSubcollections();
      if (result.success) {
        setMigrationStatus(`Migration completed! Moved ${result.migratedCount} messages.`);
      } else {
        setMigrationStatus(`Migration failed: ${result.error}`);
      }
    } catch (error: any) {
      setMigrationStatus(`Migration error: ${error.message}`);
    } finally {
      setMigrating(false);
    }
  };

  const verifyMigrationStatus = async () => {
    try {
      const result = await verifyMigration();
      if (result.error) {
        setMigrationStatus(`Verification failed: ${result.error}`);
      } else {
        setMigrationStatus(
          `Verification: Old messages: ${result.oldCount}, New messages: ${result.newCount}, Complete: ${result.isComplete}`
        );
      }
    } catch (error: any) {
      setMigrationStatus(`Verification error: ${error.message}`);
    }
  };

  return (
    <Paper sx={{ p: 2, m: 2, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h6" gutterBottom>Chat Debug Panel</Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>Current User:</strong> {currentUser?.uid || 'Not authenticated'}
        </Typography>
        <Typography variant="body2">
          <strong>Chat Rooms:</strong> {chatRooms.length}
        </Typography>
        <Typography variant="body2">
          <strong>Current Chat:</strong> {currentChat?.id || 'None selected'}
        </Typography>
        <Typography variant="body2">
          <strong>Messages:</strong> {messages.length}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          size="small" 
          onClick={createTestChat}
          disabled={!currentUser}
        >
          Create Test Chat
        </Button>
        
        <Button 
          variant="contained" 
          size="small" 
          onClick={sendTestMessage}
          disabled={!currentChat}
        >
          Send Test Message
        </Button>

        <Button 
          variant="outlined" 
          size="small" 
          onClick={runMigration}
          disabled={!currentUser || migrating}
          color="warning"
        >
          {migrating ? 'Migrating...' : 'Migrate Messages'}
        </Button>

        <Button 
          variant="outlined" 
          size="small" 
          onClick={verifyMigrationStatus}
          disabled={!currentUser}
          color="info"
        >
          Verify Migration
        </Button>
      </Box>

      {migrationStatus && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {migrationStatus}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>Test Message:</Typography>
        <input 
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>Chat Rooms:</Typography>
        {chatRooms.map(room => (
          <Box key={room.id} sx={{ mb: 1, p: 1, backgroundColor: 'white', borderRadius: 1 }}>
            <Typography variant="caption">
              <strong>ID:</strong> {room.id}<br/>
              <strong>Name:</strong> {room.name}<br/>
              <strong>Participants:</strong> {room.participants.join(', ')}<br/>
              <strong>Type:</strong> {room.type === 'group' ? 'Group' : 'One-to-One'}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box>
        <Typography variant="body2" gutterBottom>Messages:</Typography>
        {messages.map(message => (
          <Box key={message.id} sx={{ mb: 1, p: 1, backgroundColor: 'white', borderRadius: 1 }}>
            <Typography variant="caption">
              <strong>ID:</strong> {message.id}<br/>
              <strong>Content:</strong> {message.content}<br/>
              <strong>Type:</strong> {message.type}<br/>
              <strong>Sender:</strong> {message.senderId}<br/>
              <strong>Time:</strong> {message.timestamp.toString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}; 
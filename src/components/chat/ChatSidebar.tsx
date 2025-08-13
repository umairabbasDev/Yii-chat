import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Typography,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { searchUsers } from '../../lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { User } from '../../types';
import {
  SkeuomorphicInput,
  SkeuomorphicButton,
  SkeuomorphicChip,
  SkeuomorphicPaper
} from '../../UI/common';

export const ChatSidebar: React.FC = () => {
  const { chatRooms, currentChat, setCurrentChat, createChatRoom, loading } = useChat();
  
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [openNewChat, setOpenNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Debug logging
  // console.log('ChatSidebar render:', { 
  //   chatRooms: chatRooms.length, 
  //   loading, 
  //   currentUser: currentUser?.uid 
  // });

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSearch = async (searchTerm: string) => {
    if (!searchTerm.trim() || !currentUser) {
      console.log('Search skipped:', { searchTerm, currentUser: currentUser?.uid });
      return;
    }
    
    console.log('Starting user search for:', searchTerm);
    setSearching(true);
    try {
      const result = await searchUsers(searchTerm, currentUser.uid);
      console.log('Search result:', result);
      
      if (result.success && result.users) {
        console.log('Setting search results:', result.users);
        setSearchResults(result.users);
      } else {
        console.log('No users found or error:', result.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleCreateChat = async () => {
    if (!newChatName.trim() || selectedUsers.length === 0) return;
    
    setCreating(true);
    setCreateError(null);
    
    try {
      // Create chat room with current user + selected users
      const participants = [currentUser!.uid, ...selectedUsers];
      await createChatRoom(participants, newChatName, isGroup);
      
      handleCloseDialog();
    } catch (error: any) {
      console.error('Failed to create chat room:', error);
      setCreateError(error.message || 'Failed to create chat room');
    } finally {
      setCreating(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenNewChat(false);
    setNewChatName('');
    setIsGroup(false);
    setSelectedUsers([]);
    setSearchResults([]);
    setUserSearchTerm('');
    setCreateError(null);
  };

  const getUserDisplayName = async (userId: string) => {
    if (userNames[userId]) return userNames[userId];
    
    try {
      // Try to find in search results first
      const user = searchResults.find(u => u.uid === userId);
      if (user) {
        setUserNames(prev => ({ ...prev, [userId]: user.displayName }));
        return user.displayName;
      }
      
      // If not found, return a placeholder
      return `User ${userId.slice(0, 8)}...`;
    } catch (error) {
      return `User ${userId.slice(0, 8)}...`;
    }
  };

  const getChatDisplayName = (room: any) => {
    if (room.type === 'group') return room.name;
    // For one-to-one chats, show the other participant's name
    const otherParticipantId = room.participants.find((p: string) => p !== currentUser?.uid);
    if (otherParticipantId) {
      return userNames[otherParticipantId] || `User ${otherParticipantId.slice(0, 8)}...`;
    }
    return 'Unknown User';
  };

  const getChatAvatar = (room: any) => {
    if (room.type === 'group') {
      return room.groupAvatar || <GroupIcon />;
    }
    return <PersonIcon />;
  };

  // Load user names for chat room participants
  useEffect(() => {
    const loadUserNames = async () => {
      const newUserNames: Record<string, string> = {};
      
      for (const room of chatRooms) {
        for (const participantId of room.participants) {
          if (participantId !== currentUser?.uid && !userNames[participantId]) {
            // Try to find in search results first
            const user = searchResults.find(u => u.uid === participantId);
            if (user) {
              newUserNames[participantId] = user.displayName;
            }
          }
        }
      }
      
      if (Object.keys(newUserNames).length > 0) {
        setUserNames(prev => ({ ...prev, ...newUserNames }));
      }
    };

    if (chatRooms.length > 0 && currentUser) {
      loadUserNames();
    }
  }, [chatRooms, currentUser, searchResults, userNames]);

  if (loading) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(145deg, #ffffff, #f8fafc)'
      }}>
        <Typography 
          sx={{ 
            color: '#64748b',
            fontSize: '18px',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}
        >
          Loading chats...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(145deg, #ffffff, #f8fafc)'
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.1), transparent)'
        }
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3,
            color: '#1e293b',
            fontWeight: 600,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            fontSize: '20px'
          }}
        >
          Chats ({chatRooms.length})
        </Typography>
        
        {/* Search */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          <SkeuomorphicInput
            fullWidth
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={<SearchIcon sx={{ mr: 1, color: '#64748b' }} />}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '14px',
                padding: '12px 16px',
                borderRadius: '12px'
              }
            }}
          />
        </Box>

        {/* New Chat Button */}
        <SkeuomorphicButton
          fullWidth
          buttonVariant="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewChat(true)}
          sx={{
            height: '48px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          New Chat
        </SkeuomorphicButton>
      </Box>

      {/* Chat List */}
      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {filteredRooms.length === 0 ? (
          <Box sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
            margin: '16px',
            borderRadius: '16px',
            border: '1px solid rgba(148, 163, 184, 0.1)'
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b',
                fontSize: '14px',
                lineHeight: 1.5
              }}
            >
              {searchTerm ? 'No chats found matching your search.' : 'No chats yet. Create your first chat!'}
            </Typography>
          </Box>
        ) : (
          filteredRooms.map((room) => (
            <ListItem key={room.id} disablePadding sx={{ px: 2, py: 0.5 }}>
              <ListItemButton
                selected={currentChat?.id === room.id}
                onClick={() => setCurrentChat(room)}
                sx={{
                  borderRadius: '16px',
                  mx: 1,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                    },
                    '& .MuiTypography-root': {
                      color: 'white'
                    },
                    '& .MuiChip-root': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }
                  },
                  '&:hover:not(.Mui-selected)': {
                    background: 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                  }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    badgeContent={room.unreadCount}
                    color="error"
                    invisible={room.unreadCount === 0}
                    sx={{
                      '& .MuiBadge-badge': {
                        background: 'linear-gradient(145deg, #ef4444, #dc2626)',
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      background: 'linear-gradient(145deg, #6366f1, #4f46e5)',
                      boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
                    }}>
                      {getChatAvatar(room)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography 
                        variant="subtitle2" 
                        noWrap
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '14px'
                        }}
                      >
                        {getChatDisplayName(room)}
                      </Typography>
                      {room.lastMessageTime && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'inherit',
                            opacity: 0.8,
                            fontSize: '11px',
                            fontWeight: 500
                          }}
                        >
                          {formatDistanceToNow(room.lastMessageTime, { addSuffix: true })}
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'inherit',
                          opacity: 0.7,
                          maxWidth: '70%',
                          fontSize: '13px',
                          lineHeight: 1.4
                        }} 
                        noWrap
                      >
                        {room.lastMessage?.content || 'No messages yet'}
                      </Typography>
                      {room.isGroup && (
                        <SkeuomorphicChip 
                          label="Group" 
                          size="small" 
                          variant="outlined"
                          sx={{
                            fontSize: '10px',
                            height: '20px',
                            '& .MuiChip-label': {
                              px: 1
                            }
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>

      {/* New Chat Dialog */}
      <Dialog 
        open={openNewChat} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
            borderRadius: '24px',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
          pb: 2
        }}>
          Create New Chat
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {createError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {createError}
            </Alert>
          )}
          
          {/* Chat Type Selection */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <SkeuomorphicChip
              label="One-to-One"
              color={!isGroup ? 'primary' : 'default'}
              onClick={() => setIsGroup(false)}
              clickable
              sx={{
                background: !isGroup 
                  ? 'linear-gradient(145deg, #3b82f6, #2563eb)' 
                  : 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
                color: !isGroup ? 'white' : '#64748b',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
            />
            <SkeuomorphicChip
              label="Group"
              color={isGroup ? 'primary' : 'default'}
              onClick={() => setIsGroup(true)}
              clickable
              sx={{
                background: isGroup 
                  ? 'linear-gradient(145deg, #3b82f6, #2563eb)' 
                  : 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
                color: isGroup ? 'white' : '#64748b',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
            />
          </Box>

          {/* Chat Name */}
          <SkeuomorphicInput
            autoFocus
            margin="dense"
            label="Chat Name"
            fullWidth
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* User Search */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 2,
                color: '#1e293b',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              {isGroup ? 'Add Participants' : 'Select User to Chat With'}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <SkeuomorphicInput
                fullWidth
                size="small"
                placeholder="Search users by name..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUserSearch(userSearchTerm);
                  }
                }}
                startAdornment={<SearchIcon sx={{ mr: 1, color: '#64748b' }} />}
              />
              <SkeuomorphicButton
                variant="outlined"
                size="small"
                onClick={() => handleUserSearch(userSearchTerm)}
                disabled={!userSearchTerm.trim() || searching}
                sx={{
                  minWidth: '80px',
                  height: '40px',
                  borderRadius: '10px'
                }}
              >
                Search
              </SkeuomorphicButton>
            </Box>

            {/* Search Loading Indicator */}
            {searching && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 2,
                background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                borderRadius: '12px',
                border: '1px solid rgba(148, 163, 184, 0.1)'
              }}>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Searching users...
                </Typography>
              </Box>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <SkeuomorphicPaper
                variant="inset"
                depth="low"
                sx={{ 
                  maxHeight: 200, 
                  overflow: 'auto', 
                  borderRadius: '12px',
                  border: '1px solid rgba(148, 163, 184, 0.2)'
                }}
              >
                {searchResults.map((user) => (
                  <Box
                    key={user.uid}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        background: 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
                        transform: 'translateX(4px)'
                      },
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                    onClick={() => {
                      if (isGroup) {
                        // For groups, toggle selection
                        setSelectedUsers(prev => 
                          prev.includes(user.uid) 
                            ? prev.filter(id => id !== user.uid)
                            : [...prev, user.uid]
                        );
                      } else {
                        // For one-to-one, single selection
                        setSelectedUsers([user.uid]);
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        width: 36, 
                        height: 36, 
                        mr: 2,
                        background: 'linear-gradient(145deg, #6366f1, #4f46e5)',
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
                      }}>
                        {user.photoURL ? <img src={user.photoURL} alt={user.displayName} /> : user.displayName?.[0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user.displayName}
                      </Typography>
                    </Box>
                    
                    {selectedUsers.includes(user.uid) && (
                      <SkeuomorphicChip 
                        label="Selected" 
                        size="small" 
                        color="primary"
                        sx={{
                          background: 'linear-gradient(145deg, #10b981, #059669)',
                          color: 'white',
                          fontSize: '11px',
                          height: '24px'
                        }}
                      />
                    )}
                  </Box>
                ))}
              </SkeuomorphicPaper>
            )}

            {/* No Search Performed Message */}
            {!searching && searchResults.length === 0 && userSearchTerm && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 3,
                background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                borderRadius: '12px',
                border: '1px solid rgba(148, 163, 184, 0.1)'
              }}>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                  No users found matching "{userSearchTerm}"
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                  Try a different search term or check if users exist in the database
                </Typography>
              </Box>
            )}

            {/* Initial State Message */}
            {!searching && searchResults.length === 0 && !userSearchTerm && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 3,
                background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                borderRadius: '12px',
                border: '1px solid rgba(148, 163, 184, 0.1)'
              }}>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Enter a name to search for users
                </Typography>
              </Box>
            )}

            {/* Selected Users Display */}
            {selectedUsers.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Selected: {selectedUsers.length} user(s)
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
          borderTop: '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          <SkeuomorphicButton onClick={handleCloseDialog} buttonVariant="secondary">
            Cancel
          </SkeuomorphicButton>
          <SkeuomorphicButton 
            onClick={handleCreateChat} 
            buttonVariant="primary"
            disabled={creating || !newChatName.trim() || selectedUsers.length === 0}
            sx={{
              background: 'linear-gradient(145deg, #10b981, #059669)',
              '&:disabled': {
                background: 'linear-gradient(145deg, #cbd5e1, #94a3b8)'
              }
            }}
          >
            {creating ? 'Creating...' : 'Create'}
          </SkeuomorphicButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { format } from 'date-fns';
import SkeuomorphicPaper from './SkeuomorphicPaper';
import SkeuomorphicChip from './SkeuomorphicChip';
import SkeuomorphicAvatar from './SkeuomorphicAvatar';
import {
  Image as ImageIcon,
  AudioFile as AudioIcon,
  Description as DocumentIcon,
  Mic as VoiceIcon
} from '@mui/icons-material';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  showSenderInfo?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isOwnMessage, 
  showSenderInfo = false 
}) => {
  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <Box sx={{ maxWidth: 300, maxHeight: 300 }}>
            <img
              src={message.mediaUrl}
              alt="Shared image"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                cursor: 'pointer'
              }}
            />
          </Box>
        );
      
      case 'audio':
      case 'voice':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AudioIcon color="action" />
              <Typography variant="body2" color="text.secondary">
                {message.fileName || 'Audio Message'}
              </Typography>
              {message.duration && (
                <Typography variant="caption" color="text.secondary">
                  {Math.round(message.duration)}s
                </Typography>
              )}
            </Box>
          </Box>
        );
      
      case 'document':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DocumentIcon color="action" />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {message.fileName || 'Document'}
              </Typography>
              {message.fileSize && (
                <Typography variant="caption" color="text.secondary">
                  {(message.fileSize / 1024 / 1024).toFixed(2)} MB
                </Typography>
              )}
            </Box>
          </Box>
        );
      
      default:
        return (
          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
            {message.content}
          </Typography>
        );
    }
  };

  const getMessageTypeIcon = () => {
    switch (message.type) {
      case 'image':
        return <ImageIcon fontSize="small" />;
      case 'audio':
      case 'voice':
        return <VoiceIcon fontSize="small" />;
      case 'document':
        return <DocumentIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        mb: 2,
        maxWidth: '70%',
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
          maxWidth: '100%'
        }}
      >
        {/* Sender Info */}
        {showSenderInfo && !isOwnMessage && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <SkeuomorphicAvatar
              src={message.senderAvatar}
              alt={message.senderName}
              size="small"
            />
            <Typography variant="caption" color="text.secondary">
              {message.senderName}
            </Typography>
          </Box>
        )}
        
        {/* Message Bubble */}
        <SkeuomorphicPaper
          variant={isOwnMessage ? 'elevated' : 'default'}
          depth="medium"
          padding="medium"
          sx={{
            backgroundColor: isOwnMessage 
              ? 'linear-gradient(145deg, #4f46e5, #6366f1)' 
              : undefined,
            color: isOwnMessage ? '#ffffff' : undefined,
            borderColor: isOwnMessage 
              ? 'rgba(79, 70, 229, 0.3)' 
              : undefined,
            position: 'relative',
            '&::before': isOwnMessage ? {
              content: '""',
              position: 'absolute',
              top: '50%',
              right: -8,
              width: 0,
              height: 0,
              borderLeft: '8px solid #4f46e5',
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              transform: 'translateY(-50%)'
            } : {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: -8,
              width: 0,
              height: 0,
              borderRight: '8px solid #f8fafc',
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              transform: 'translateY(-50%)'
            }
          }}
        >
          {/* Message Type Indicator */}
          {message.type !== 'text' && (
            <Box sx={{ mb: 1 }}>
              <SkeuomorphicChip
                icon={getMessageTypeIcon()}
                label={message.type}
                size="small"
                variant={isOwnMessage ? 'primary' : 'default'}
              />
            </Box>
          )}
          
          {/* Message Content */}
          {renderMessageContent()}
          
          {/* Timestamp */}
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: 'block',
              textAlign: 'right',
              opacity: 0.7,
              color: isOwnMessage ? 'rgba(255,255,255,0.8)' : 'text.secondary'
            }}
          >
            {format(message.timestamp, 'HH:mm')}
          </Typography>
        </SkeuomorphicPaper>
      </Box>
    </Box>
  );
};

export default MessageBubble; 
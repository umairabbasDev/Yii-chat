import React from 'react';
import { Box, Typography } from '@mui/material';
import SkeuomorphicPaper from './SkeuomorphicPaper';

interface TypingIndicatorProps {
  isTyping: boolean;
  userName?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  isTyping, 
  userName = 'Someone' 
}) => {
  if (!isTyping) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 2,
        maxWidth: '70%',
        alignSelf: 'flex-start'
      }}
    >
      <SkeuomorphicPaper
        variant="default"
        depth="shallow"
        padding="medium"
        sx={{
          position: 'relative',
          '&::before': {
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {userName} is typing
          </Typography>
          
          {/* Animated dots */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'text.secondary',
                  animation: `typing 1.4s infinite ease-in-out`,
                  animationDelay: `${index * 0.2}s`,
                  '@keyframes typing': {
                    '0%, 60%, 100%': {
                      transform: 'translateY(0)',
                      opacity: 0.4
                    },
                    '30%': {
                      transform: 'translateY(-10px)',
                      opacity: 1
                    }
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </SkeuomorphicPaper>
    </Box>
  );
};

export default TypingIndicator; 
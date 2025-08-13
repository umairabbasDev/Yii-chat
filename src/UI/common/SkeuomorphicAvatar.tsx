import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface SkeuomorphicAvatarProps extends BoxProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  status?: 'online' | 'offline' | 'away';
}

const SkeuomorphicAvatar: React.FC<SkeuomorphicAvatarProps> = ({ 
  src,
  alt,
  size = 'medium',
  status,
  sx,
  ...props 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32, fontSize: '0.75rem' };
      case 'large':
        return { width: 64, height: 64, fontSize: '1.5rem' };
      case 'xlarge':
        return { width: 96, height: 96, fontSize: '2rem' };
      default:
        return { width: 48, height: 48, fontSize: '1rem' };
    }
  };

  const getStatusStyles = () => {
    if (!status) return {};
    
    const statusColors = {
      online: '#10b981',
      offline: '#6b7280',
      away: '#f59e0b'
    };

    return {
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: statusColors[status],
        border: '2px solid #ffffff',
        boxShadow: '0 0 0 2px rgba(0,0,0,0.1)'
      }
    };
  };

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        color: '#ffffff',
        background: src 
          ? 'transparent' 
          : 'linear-gradient(145deg, #4f46e5, #6366f1)',
        border: '2px solid rgba(255,255,255,0.8)',
        boxShadow: `
          0 4px 8px rgba(0,0,0,0.15),
          0 2px 4px rgba(0,0,0,0.1),
          inset 0 1px 0 rgba(255,255,255,0.9)
        `,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: `
            0 8px 16px rgba(0,0,0,0.2),
            0 4px 8px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.95)
          `
        },
        ...getSizeStyles(),
        ...getStatusStyles(),
        ...sx
      }}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'
          }}
        />
      ) : (
        alt?.charAt(0)?.toUpperCase() || 'U'
      )}
    </Box>
  );
};

export default SkeuomorphicAvatar; 
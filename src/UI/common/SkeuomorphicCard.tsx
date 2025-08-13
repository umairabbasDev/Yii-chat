import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface SkeuomorphicCardProps extends BoxProps {
  children: React.ReactNode;
  depth?: 'shallow' | 'medium' | 'deep';
  variant?: 'default' | 'elevated' | 'inset';
}

const SkeuomorphicCard: React.FC<SkeuomorphicCardProps> = ({ 
  children, 
  depth = 'medium', 
  variant = 'default',
  sx,
  ...props 
}) => {
  const getDepthStyles = () => {
    switch (depth) {
      case 'shallow':
        return {
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.1),
            0 1px 2px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `,
          transform: 'translateY(0px)'
        };
      case 'medium':
        return {
          boxShadow: `
            0 4px 8px rgba(0,0,0,0.12),
            0 2px 4px rgba(0,0,0,0.08),
            inset 0 1px 0 rgba(255,255,255,0.9)
          `,
          transform: 'translateY(-1px)'
        };
      case 'deep':
        return {
          boxShadow: `
            0 8px 16px rgba(0,0,0,0.15),
            0 4px 8px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.95)
          `,
          transform: 'translateY(-2px)'
        };
      default:
        return {};
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          border: '1px solid rgba(255,255,255,0.8)',
          borderRadius: '16px'
        };
      case 'inset':
        return {
          background: 'linear-gradient(145deg, #e6e6e6, #f5f5f5)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '16px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        };
      default:
        return {
          background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
          border: '1px solid rgba(255,255,255,0.8)',
          borderRadius: '12px'
        };
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `
            0 12px 24px rgba(0,0,0,0.15),
            0 6px 12px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.95)
          `
        },
        ...getDepthStyles(),
        ...getVariantStyles(),
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SkeuomorphicCard; 
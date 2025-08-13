import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface SkeuomorphicPaperProps extends BoxProps {
  children: React.ReactNode;
  depth?: 'shallow' | 'medium' | 'deep';
  variant?: 'default' | 'elevated' | 'inset' | 'glass';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const SkeuomorphicPaper: React.FC<SkeuomorphicPaperProps> = ({ 
  children, 
  depth = 'medium', 
  variant = 'default',
  padding = 'medium',
  sx,
  ...props 
}) => {
  const getDepthStyles = () => {
    switch (depth) {
      case 'shallow':
        return {
          boxShadow: `
            0 1px 3px rgba(0,0,0,0.08),
            0 1px 2px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.9)
          `
        };
      case 'medium':
        return {
          boxShadow: `
            0 4px 6px rgba(0,0,0,0.1),
            0 2px 4px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.95)
          `
        };
      case 'deep':
        return {
          boxShadow: `
            0 10px 15px rgba(0,0,0,0.15),
            0 4px 6px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.98)
          `
        };
      default:
        return {};
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
          border: '1px solid rgba(255,255,255,0.9)',
          borderRadius: '16px'
        };
      case 'inset':
        return {
          background: 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '16px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        };
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '16px'
        };
      default:
        return {
          background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: '12px'
        };
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: '8px' };
      case 'large':
        return { padding: '24px' };
      default:
        return { padding: '16px' };
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: variant === 'inset' ? 'none' : 'translateY(-2px)',
          boxShadow: variant === 'inset' ? undefined : `
            0 12px 24px rgba(0,0,0,0.15),
            0 6px 12px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.98)
          `
        },
        ...getDepthStyles(),
        ...getVariantStyles(),
        ...getPaddingStyles(),
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SkeuomorphicPaper; 
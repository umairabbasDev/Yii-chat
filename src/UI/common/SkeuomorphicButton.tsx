import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface SkeuomorphicButtonProps extends BoxProps {
  children: React.ReactNode;
  buttonVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  depth?: 'shallow' | 'medium' | 'deep';
  onClick?: () => void;
  disabled?: boolean;
}

const SkeuomorphicButton: React.FC<SkeuomorphicButtonProps> = ({ 
  children,
  buttonVariant = 'default',
  size = 'medium',
  depth = 'medium',
  onClick,
  disabled = false,
  sx,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (buttonVariant) {
      case 'primary':
        return {
          background: 'linear-gradient(145deg, #4f46e5, #6366f1)',
          color: '#ffffff',
          border: '1px solid rgba(79, 70, 229, 0.3)',
          '&:hover': {
            background: 'linear-gradient(145deg, #4338ca, #5855eb)',
            boxShadow: `
              0 8px 16px rgba(79, 70, 229, 0.3),
              0 4px 8px rgba(79, 70, 229, 0.2)
            `
          }
        };
      case 'secondary':
        return {
          background: 'linear-gradient(145deg, #6b7280, #9ca3af)',
          color: '#ffffff',
          border: '1px solid rgba(107, 114, 128, 0.3)',
          '&:hover': {
            background: 'linear-gradient(145deg, #4b5563, #6b7280)',
            boxShadow: `
              0 8px 16px rgba(107, 114, 128, 0.3),
              0 4px 8px rgba(107, 114, 128, 0.2)
            `
          }
        };
      case 'success':
        return {
          background: 'linear-gradient(145deg, #059669, #10b981)',
          color: '#ffffff',
          border: '1px solid rgba(5, 150, 105, 0.3)',
          '&:hover': {
            background: 'linear-gradient(145deg, #047857, #059669)',
            boxShadow: `
              0 8px 16px rgba(5, 150, 105, 0.3),
              0 4px 8px rgba(5, 150, 105, 0.2)
            `
          }
        };
      case 'warning':
        return {
          background: 'linear-gradient(145deg, #d97706, #f59e0b)',
          color: '#ffffff',
          border: '1px solid rgba(217, 119, 6, 0.3)',
          '&:hover': {
            background: 'linear-gradient(145deg, #b45309, #d97706)',
            boxShadow: `
              0 8px 16px rgba(217, 119, 6, 0.3),
              0 4px 8px rgba(217, 119, 6, 0.2)
            `
          }
        };
      case 'error':
        return {
          background: 'linear-gradient(145deg, #dc2626, #ef4444)',
          color: '#ffffff',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          '&:hover': {
            background: 'linear-gradient(145deg, #b91c1c, #dc2626)',
            boxShadow: `
              0 8px 16px rgba(220, 38, 38, 0.3),
              0 4px 8px rgba(220, 38, 38, 0.2)
            `
          }
        };
      default:
        return {
          background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
          color: '#475569',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          '&:hover': {
            background: 'linear-gradient(145deg, #f1f5f9, #cbd5e1)',
            boxShadow: `
              0 8px 16px rgba(148, 163, 184, 0.2),
              0 4px 8px rgba(148, 163, 184, 0.1)
            `
          }
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '8px 16px', fontSize: '0.875rem', borderRadius: '8px' };
      case 'large':
        return { padding: '16px 32px', fontSize: '1.125rem', borderRadius: '16px' };
      default:
        return { padding: '12px 24px', fontSize: '1rem', borderRadius: '12px' };
    }
  };

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

  return (
    <Box
      component="button"
      onClick={onClick}
      disabled={disabled}
              sx={{
          position: 'relative',
          fontWeight: 600,
          textTransform: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          fontFamily: 'inherit',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:active': {
            transform: 'translateY(1px)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          },
          '&:disabled': {
            opacity: 0.6,
            transform: 'none',
            boxShadow: 'none',
            cursor: 'not-allowed'
          },
          ...getVariantStyles(),
          ...getSizeStyles(),
          ...getDepthStyles(),
          ...sx
        }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SkeuomorphicButton; 
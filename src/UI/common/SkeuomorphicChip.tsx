import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface SkeuomorphicChipProps extends BoxProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  onDelete?: () => void;
  deletable?: boolean;
}

const SkeuomorphicChip: React.FC<SkeuomorphicChipProps> = ({ 
  label,
  icon,
  variant = 'default',
  size = 'medium',
  onDelete,
  deletable = false,
  sx,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(145deg, #4f46e5, #6366f1)',
          color: '#ffffff',
          border: '1px solid rgba(79, 70, 229, 0.3)'
        };
      case 'secondary':
        return {
          background: 'linear-gradient(145deg, #6b7280, #9ca3af)',
          color: '#ffffff',
          border: '1px solid rgba(107, 114, 128, 0.3)'
        };
      case 'success':
        return {
          background: 'linear-gradient(145deg, #059669, #10b981)',
          color: '#ffffff',
          border: '1px solid rgba(5, 150, 105, 0.3)'
        };
      case 'warning':
        return {
          background: 'linear-gradient(145deg, #d97706, #f59e0b)',
          color: '#ffffff',
          border: '1px solid rgba(217, 119, 6, 0.3)'
        };
      case 'error':
        return {
          background: 'linear-gradient(145deg, #dc2626, #ef4444)',
          color: '#ffffff',
          border: '1px solid rgba(220, 38, 38, 0.3)'
        };
      default:
        return {
          background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
          color: '#475569',
          border: '1px solid rgba(226, 232, 240, 0.8)'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { 
          padding: '4px 8px', 
          fontSize: '0.75rem', 
          borderRadius: '12px',
          gap: '4px'
        };
      case 'large':
        return { 
          padding: '8px 16px', 
          fontSize: '1rem', 
          borderRadius: '20px',
          gap: '8px'
        };
      default:
        return { 
          padding: '6px 12px', 
          fontSize: '0.875rem', 
          borderRadius: '16px',
          gap: '6px'
        };
    }
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        position: 'relative',
        boxShadow: `
          0 2px 4px rgba(0,0,0,0.1),
          0 1px 2px rgba(0,0,0,0.06),
          inset 0 1px 0 rgba(255,255,255,0.8)
        `,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: `
            0 4px 8px rgba(0,0,0,0.15),
            0 2px 4px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.9)
          `
        },
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...sx
      }}
      {...props}
    >
      {icon && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
      )}
      
      <span>{label}</span>
      
      {deletable && onDelete && (
        <Box
          component="button"
          onClick={onDelete}
          sx={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            marginLeft: '4px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
            opacity: 0.7,
            transition: 'all 0.2s ease',
            '&:hover': {
              opacity: 1,
              background: 'rgba(0,0,0,0.1)',
              transform: 'scale(1.1)'
            }
          }}
        >
          ×
        </Box>
      )}
    </Box>
  );
};

export default SkeuomorphicChip; 
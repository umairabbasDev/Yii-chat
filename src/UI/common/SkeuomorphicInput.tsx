import React from 'react';
import { Box, BoxProps, InputBase, InputBaseProps } from '@mui/material';

interface SkeuomorphicInputProps extends Omit<InputBaseProps, 'variant'> {
  label?: string;
  error?: boolean;
  depth?: 'shallow' | 'medium' | 'deep';
}

const SkeuomorphicInput: React.FC<SkeuomorphicInputProps> = ({ 
  label,
  error = false,
  depth = 'medium',
  sx,
  ...props 
}) => {
  const getDepthStyles = () => {
    switch (depth) {
      case 'shallow':
        return {
          boxShadow: `
            inset 0 1px 2px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `
        };
      case 'medium':
        return {
          boxShadow: `
            inset 0 2px 4px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.9)
          `
        };
      case 'deep':
        return {
          boxShadow: `
            inset 0 4px 8px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.95)
          `
        };
      default:
        return {};
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Box
          component="label"
          sx={{
            display: 'block',
            mb: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: error ? 'error.main' : 'text.primary'
          }}
        >
          {label}
        </Box>
      )}
      <InputBase
        {...props}
        sx={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '1rem',
          borderRadius: '12px',
          background: error 
            ? 'linear-gradient(145deg, #fef2f2, #fee2e2)' 
            : 'linear-gradient(145deg, #ffffff, #f8fafc)',
          border: `1px solid ${error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(226, 232, 240, 0.8)'}`,
          color: error ? 'error.main' : 'text.primary',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus': {
            background: error 
              ? 'linear-gradient(145deg, #fef2f2, #fecaca)' 
              : 'linear-gradient(145deg, #ffffff, #f1f5f9)',
            borderColor: error ? 'error.main' : 'primary.main',
            boxShadow: `
              0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(79, 70, 229, 0.1)'},
              inset 0 2px 4px rgba(0,0,0,0.12),
              inset 0 1px 0 rgba(255,255,255,0.9)
            `
          },
          '&:hover': {
            background: error 
              ? 'linear-gradient(145deg, #fef2f2, #fecaca)' 
              : 'linear-gradient(145deg, #ffffff, #f1f5f9)'
          },
          '&::placeholder': {
            color: error ? 'error.light' : 'text.secondary',
            opacity: 0.7
          },
          ...getDepthStyles(),
          ...sx
        }}
      />
    </Box>
  );
};

export default SkeuomorphicInput; 
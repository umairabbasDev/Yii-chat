import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { designTokens } from '../theme';
import { alpha } from '@mui/material/styles';

// Subcomponent: Logo and Brand
const DashboardBrand: React.FC = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.2)',
          transform: 'scale(1.05)',
        },
        transition: designTokens.transitions.normal,
      }}
    >
      <MenuIcon />
    </IconButton>

    <Typography 
      variant="h6" 
      component="div" 
      sx={{ 
        flexGrow: 1,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        fontSize: '1.5rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      Yii Chat
    </Typography>
  </Box>
);

// Subcomponent: User Status Chip
const UserStatusChip: React.FC<{ status?: string }> = ({ status = 'online' }) => (
  <Chip
    label={status}
    color={status === 'online' ? 'success' : 'default'}
    size="small"
    variant="outlined"
    sx={{
      background: status === 'online' 
        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
      color: 'white',
      border: 'none',
      fontWeight: 600,
      fontSize: '0.75rem',
      height: '24px',
      '& .MuiChip-label': {
        px: 1,
      },
      boxShadow: designTokens.shadows.skeuomorphic.light,
    }}
  />
);

// Subcomponent: User Avatar
const UserAvatar: React.FC<{ user: any; onClick: (event: React.MouseEvent<HTMLElement>) => void }> = ({ user, onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      p: 0,
      border: '2px solid rgba(255, 255, 255, 0.3)',
      transition: designTokens.transitions.normal,
      '&:hover': {
        transform: 'scale(1.1)',
        border: '2px solid rgba(255, 255, 255, 0.5)',
      },
    }}
  >
    <Avatar
      alt={user?.displayName || 'User'}
      src={user?.photoURL}
      sx={{
        width: 40,
        height: 40,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: designTokens.shadows.skeuomorphic.medium,
      }}
    >
      {user?.displayName?.charAt(0) || 'U'}
    </Avatar>
  </IconButton>
);

// Subcomponent: User Menu
const UserMenu: React.FC<{ 
  anchorEl: HTMLElement | null; 
  onClose: () => void; 
  onLogout: () => void 
}> = ({ anchorEl, onClose, onLogout }) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    PaperProps={{
      sx: {
        background: designTokens.gradients.glass,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: designTokens.borderRadius.lg,
        boxShadow: designTokens.shadows['2xl'],
        mt: 1,
      }
    }}
  >
    <MenuItem onClick={onClose} sx={{ borderRadius: designTokens.borderRadius.sm, mx: 1, my: 0.5 }}>
      <ListItemIcon>
        <PersonIcon fontSize="small" sx={{ color: designTokens.colors.primary[600] }} />
      </ListItemIcon>
      <ListItemText>Profile</ListItemText>
    </MenuItem>
    
    <MenuItem onClick={onClose} sx={{ borderRadius: designTokens.borderRadius.sm, mx: 1, my: 0.5 }}>
      <ListItemIcon>
        <SettingsIcon fontSize="small" sx={{ color: designTokens.colors.primary[600] }} />
      </ListItemIcon>
      <ListItemText>Settings</ListItemText>
    </MenuItem>
    
    <MenuItem onClick={onLogout} sx={{ 
      borderRadius: designTokens.borderRadius.sm, 
      mx: 1, 
      my: 0.5,
      color: designTokens.colors.error[600],
      '&:hover': {
        background: alpha(designTokens.colors.error[50], 0.1),
      }
    }}>
      <ListItemIcon>
        <LogoutIcon fontSize="small" sx={{ color: designTokens.colors.error[600] }} />
      </ListItemIcon>
      <ListItemText>Logout</ListItemText>
    </MenuItem>
  </Menu>
);

export const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleMenuClose();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: designTokens.gradients.glass,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(designTokens.colors.neutral[300], 0.2)}`,
        boxShadow: designTokens.shadows.skeuomorphic.light,
      }}
    >
      <Toolbar sx={{ px: 3, py: 1 }}>
        <DashboardBrand />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <UserStatusChip status={currentUser?.status} />
          <UserAvatar user={currentUser} onClick={handleMenuOpen} />
          <UserMenu 
            anchorEl={anchorEl} 
            onClose={handleMenuClose} 
            onLogout={handleLogout} 
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 
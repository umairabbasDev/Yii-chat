import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Alert,
  Link
} from '@mui/material';
import { PersonAddOutlined } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { designTokens } from '../../theme';

interface SignupProps {
  onSwitchToLogin: () => void;
}

// Subcomponent: Signup Header
const SignupHeader: React.FC = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Avatar 
      sx={{ 
        m: '0 auto 16px',
        width: 64,
        height: 64,
        background: designTokens.gradients.secondary,
        boxShadow: designTokens.shadows.skeuomorphic.medium,
        border: '3px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <PersonAddOutlined sx={{ fontSize: 32 }} />
    </Avatar>
    <Typography 
      component="h1" 
      variant="h4" 
      sx={{ 
        mb: 1,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      Join Yii Chat
    </Typography>
    <Typography 
      variant="body1" 
      sx={{ 
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1.1rem',
        fontWeight: 400,
      }}
    >
      Create your account to get started
    </Typography>
  </Box>
);

// Subcomponent: Error Alert
const ErrorAlert: React.FC<{ error: string }> = ({ error }) => (
  <Alert 
    severity="error" 
    sx={{ 
      width: '100%', 
      mb: 3, 
      borderRadius: designTokens.borderRadius.md,
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ffffff',
      '& .MuiAlert-icon': {
        color: '#ffffff',
      },
    }}
  >
    {error}
  </Alert>
);

// Subcomponent: Form Fields
const SignupFormFields: React.FC<{
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  onDisplayNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}> = ({ 
  displayName, 
  email, 
  password, 
  confirmPassword, 
  onDisplayNameChange, 
  onEmailChange, 
  onPasswordChange, 
  onConfirmPasswordChange 
}) => (
  <Box sx={{ width: '100%' }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="displayName"
      label="Display Name"
      name="displayName"
      autoComplete="name"
      autoFocus
      value={displayName}
      onChange={(e) => onDisplayNameChange(e.target.value)}
      sx={{ 
        mb: 3,
        '& .MuiOutlinedInput-root': {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: designTokens.borderRadius.md,
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
          },
          '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 1)',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: '2px',
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 500,
        },
      }}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      value={email}
      onChange={(e) => onEmailChange(e.target.value)}
      sx={{ 
        mb: 3,
        '& .MuiOutlinedInput-root': {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: designTokens.borderRadius.md,
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
          },
          '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 1)',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: '2px',
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 500,
        },
      }}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="new-password"
      value={password}
      onChange={(e) => onPasswordChange(e.target.value)}
      sx={{ 
        mb: 3,
        '& .MuiOutlinedInput-root': {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: designTokens.borderRadius.md,
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
          },
          '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 1)',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: '2px',
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 500,
        },
      }}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="confirmPassword"
      label="Confirm Password"
      type="password"
      id="confirmPassword"
      autoComplete="new-password"
      value={confirmPassword}
      onChange={(e) => onConfirmPasswordChange(e.target.value)}
      sx={{ 
        mb: 4,
        '& .MuiOutlinedInput-root': {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: designTokens.borderRadius.md,
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
          },
          '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 1)',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: '2px',
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 500,
        },
      }}
    />
  </Box>
);

// Subcomponent: Submit Button
const SubmitButton: React.FC<{ loading: boolean; onSubmit: () => void }> = ({ loading, onSubmit }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    onClick={onSubmit}
    disabled={loading}
    sx={{ 
      mt: 2, 
      mb: 3, 
      py: 2,
      background: designTokens.gradients.secondary,
      borderRadius: designTokens.borderRadius.md,
      fontSize: '1.1rem',
      fontWeight: 600,
      textTransform: 'none',
      boxShadow: designTokens.shadows.skeuomorphic.medium,
      border: '2px solid rgba(255, 255, 255, 0.2)',
      transition: designTokens.transitions.normal,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: designTokens.shadows.skeuomorphic.heavy,
      },
      '&:disabled': {
        background: 'rgba(255, 255, 255, 0.3)',
        transform: 'none',
        boxShadow: 'none',
      },
    }}
  >
    {loading ? 'Creating Account...' : 'Sign Up'}
  </Button>
);

// Subcomponent: Switch to Login
const SwitchToLogin: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Link
      component="button"
      variant="body2"
      onClick={onSwitch}
      sx={{ 
        cursor: 'pointer',
        color: 'rgba(255, 255, 255, 0.8)',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 500,
        transition: designTokens.transitions.fast,
        '&:hover': {
          color: '#ffffff',
          textDecoration: 'underline',
        },
      }}
    >
      Already have an account? Sign In
    </Link>
  </Box>
);

export const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword || !displayName) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, displayName);
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: designTokens.borderRadius['2xl'],
            background: designTokens.gradients.glass,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: designTokens.shadows['2xl'],
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: designTokens.borderRadius['2xl'],
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              zIndex: -1,
            },
          }}
        >
          <SignupHeader />
          
          {error && <ErrorAlert error={error} />}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <SignupFormFields
              displayName={displayName}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              onDisplayNameChange={setDisplayName}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
            />
            
            <SubmitButton loading={loading} onSubmit={handleSubmit} />
            
            <SwitchToLogin onSwitch={onSwitchToLogin} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}; 
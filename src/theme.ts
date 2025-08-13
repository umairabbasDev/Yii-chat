import { createTheme, alpha } from '@mui/material/styles';
import { red, blue, green, purple, orange, grey } from '@mui/material/colors';

// Skeuomorphic Design Tokens
const designTokens = {
  // Color Palette
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      blue: '#6366f1',
      purple: '#8b5cf6',
      teal: '#14b8a6',
      rose: '#f43f5e',
      amber: '#f59e0b',
    }
  },
  
  // Shadows & Elevation
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
    
    // Skeuomorphic shadows
    skeuomorphic: {
      light: '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
      inset: 'inset 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    }
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    error: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    neutral: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
    glass: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
  },
  
  // Border Radius
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  // Transitions
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    bounce: 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
};

// Create the theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: designTokens.colors.primary[600],
      light: designTokens.colors.primary[400],
      dark: designTokens.colors.primary[800],
      contrastText: '#ffffff',
    },
    secondary: {
      main: designTokens.colors.secondary[600],
      light: designTokens.colors.secondary[400],
      dark: designTokens.colors.secondary[800],
      contrastText: '#ffffff',
    },
    success: {
      main: designTokens.colors.success[600],
      light: designTokens.colors.success[400],
      dark: designTokens.colors.success[800],
      contrastText: '#ffffff',
    },
    warning: {
      main: designTokens.colors.warning[600],
      light: designTokens.colors.warning[400],
      dark: designTokens.colors.warning[800],
      contrastText: '#ffffff',
    },
    error: {
      main: designTokens.colors.error[600],
      light: designTokens.colors.error[400],
      dark: designTokens.colors.error[800],
      contrastText: '#ffffff',
    },
    background: {
      default: designTokens.colors.neutral[50],
      paper: designTokens.colors.neutral[100],
    },
    text: {
      primary: designTokens.colors.neutral[800],
      secondary: designTokens.colors.neutral[600],
      disabled: designTokens.colors.neutral[400],
    },
    divider: alpha(designTokens.colors.neutral[300], 0.2),
  },
  
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: designTokens.colors.neutral[900],
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: designTokens.colors.neutral[800],
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: designTokens.colors.neutral[800],
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: designTokens.colors.neutral[800],
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: designTokens.colors.neutral[800],
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: designTokens.colors.neutral[800],
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: designTokens.colors.neutral[700],
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: designTokens.colors.neutral[600],
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: designTokens.colors.neutral[500],
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: designTokens.colors.neutral[500],
    },
  },
  
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.md),
  },
  
  spacing: 8,
  
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: designTokens.gradients.neutral,
          minHeight: '100vh',
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        '*': {
          boxSizing: 'border-box',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: designTokens.colors.neutral[100],
          borderRadius: designTokens.borderRadius.full,
        },
        '::-webkit-scrollbar-thumb': {
          background: designTokens.colors.neutral[300],
          borderRadius: designTokens.borderRadius.full,
          '&:hover': {
            background: designTokens.colors.neutral[400],
          },
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: designTokens.borderRadius.lg,
        },
        elevation1: {
          boxShadow: designTokens.shadows.skeuomorphic.light,
        },
        elevation2: {
          boxShadow: designTokens.shadows.skeuomorphic.medium,
        },
        elevation3: {
          boxShadow: designTokens.shadows.skeuomorphic.heavy,
        },
      },
    },
    
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: designTokens.gradients.glass,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(designTokens.colors.neutral[300], 0.2)}`,
          boxShadow: designTokens.shadows.skeuomorphic.light,
        },
      },
    },
    
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          textTransform: 'none',
          fontWeight: 600,
          transition: designTokens.transitions.normal,
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: designTokens.gradients.primary,
          boxShadow: designTokens.shadows.skeuomorphic.medium,
          '&:hover': {
            boxShadow: designTokens.shadows.skeuomorphic.heavy,
          },
        },
        outlined: {
          border: `2px solid ${designTokens.colors.primary[300]}`,
          '&:hover': {
            border: `2px solid ${designTokens.colors.primary[400]}`,
            background: alpha(designTokens.colors.primary[50], 0.1),
          },
        },
      },
    },
    
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.md,
            transition: designTokens.transitions.normal,
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: designTokens.colors.primary[400],
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: designTokens.colors.primary[600],
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.full,
          fontWeight: 500,
        },
        outlined: {
          border: `1px solid ${alpha(designTokens.colors.neutral[300], 0.3)}`,
        },
      },
    },
    
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
        },
      },
    },
    
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: designTokens.borderRadius['2xl'],
          background: designTokens.gradients.glass,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(designTokens.colors.neutral[300], 0.2)}`,
          boxShadow: designTokens.shadows['2xl'],
        },
      },
    },
    
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.sm,
          margin: '2px 8px',
          transition: designTokens.transitions.fast,
          '&:hover': {
            background: alpha(designTokens.colors.primary[50], 0.1),
          },
        },
      },
    },
  },
});

// Export design tokens for use in components
export { designTokens };
export default theme;

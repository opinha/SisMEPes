export const theme = {
  colors: {
    primary: '#0EA5E9', // Sky 500
    secondary: '#10B981', // Emerald 500
    accent: '#6366F1', // Indigo 500
    background: {
      primary: '#0F172A', // Slate 900
      secondary: '#1E293B', // Slate 800
      white: '#FFFFFF',
      light: '#F8FAFC', // Slate 50
      card: '#FFFFFF',
      input: '#F1F5F9', // Slate 100
      weather: '#0EA5E9',
    },
    text: {
      primary: '#0F172A', // Slate 900
      secondary: '#64748B', // Slate 500
      placeholder: '#94A3B8', // Slate 400
      inverse: '#FFFFFF',
      link: '#0EA5E9',
    },
    border: {
      light: '#E2E8F0', // Slate 200
      card: '#F1F5F9', // Slate 100
      input: '#CBD5E1', // Slate 300
      focus: '#0EA5E9',
    },
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

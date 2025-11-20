import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', loading = false, disabled = false }: ButtonProps) {
  const backgroundColor = variant === 'primary' ? theme.colors.primary : theme.colors.background.secondary;
  const textColor = variant === 'primary' ? theme.colors.text.inverse : theme.colors.text.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    ...theme.shadows.md,
  },
  text: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.7,
  },
});

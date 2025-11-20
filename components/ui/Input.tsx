import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '@/constants/theme';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'dark';
}

export function Input({ variant = 'default', style, ...props }: InputProps) {
  return (
    <TextInput
      style={[
        styles.input,
        variant === 'dark' && styles.dark,
        style,
      ]}
      placeholderTextColor={theme.colors.text.placeholder}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.background.input,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.md,
    minHeight: 56,
  },
  dark: {
    backgroundColor: theme.colors.background.secondary,
    borderColor: theme.colors.border.card,
    color: theme.colors.text.inverse,
  },
});

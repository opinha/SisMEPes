import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export function WeatherCard() {
  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Previsão do Tempo</Text>
          <Text style={styles.description}>Parcialmente nublado</Text>
          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>28°</Text>
            <Text style={styles.unit}>C</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="partly-sunny" size={64} color={theme.colors.text.inverse} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.md,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: 48,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    lineHeight: 56,
  },
  unit: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    marginTop: 8,
  },
  iconContainer: {
    marginLeft: theme.spacing.md,
    opacity: 0.9,
  },
});

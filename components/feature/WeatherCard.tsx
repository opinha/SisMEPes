import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

export function WeatherCard() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="partly-sunny" size={48} color={theme.colors.text.inverse} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Previsão do tempo</Text>
        <Text style={styles.description}>Parcialmente nublado</Text>
      </View>
      <Text style={styles.temperature}>28°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.weather,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
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
    color: theme.colors.text.inverse,
  },
  temperature: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
});

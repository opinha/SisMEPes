import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { FishingSpot } from '@/services/fishingSpotService';

interface SpotCardProps {
  spot: FishingSpot;
  onDelete: (id: string) => void;
}

export function SpotCard({ spot, onDelete }: SpotCardProps) {
  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}°, ${lng.toFixed(6)}°`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="location" size={24} color={theme.colors.primary} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{spot.name}</Text>
          <Text style={styles.date}>{formatDate(spot.created_at)}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(spot.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color={theme.colors.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.coordinates}>
        <Ionicons name="navigate" size={16} color={theme.colors.text.secondary} />
        <Text style={styles.coordinatesText}>
          {formatCoordinates(spot.latitude, spot.longitude)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  headerText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: theme.spacing.sm,
  },
  coordinates: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  coordinatesText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
});

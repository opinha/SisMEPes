import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { DiaryEntry } from '@/services/diaryService';

interface DiaryCardProps {
  entry: DiaryEntry;
}

export function DiaryCard({ entry }: DiaryCardProps) {
  const router = useRouter();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/diary-details?id=${entry.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text" size={20} color={theme.colors.accent} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Diário de Pesca</Text>
          <Text style={styles.date}>{formatDate(entry.date)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.text.placeholder} />
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color={theme.colors.text.secondary} />
          <Text style={styles.location} numberOfLines={1}>{entry.location}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBadge}>
            <Ionicons name="fish-outline" size={14} color={theme.colors.primary} />
            <Text style={styles.statText}>
              <Text style={styles.statValue}>{entry.fish_count}</Text> capturas
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    ...theme.shadows.sm,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(99, 102, 241, 0.1)', // Accent color with opacity
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  date: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
  },
  content: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.light,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  location: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 165, 233, 0.1)', // Primary color with opacity
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  statText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginLeft: 4,
  },
  statValue: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
});

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
      month: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/diary-details?id=${entry.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="document-text-outline" size={28} color={theme.colors.text.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Diário, {formatDate(entry.date)}</Text>
        <Text style={styles.location}>{entry.location}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{entry.fish_count}</Text>
        <Text style={styles.countLabel}>peixes</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  countContainer: {
    alignItems: 'flex-end',
  },
  count: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  countLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
  },
});

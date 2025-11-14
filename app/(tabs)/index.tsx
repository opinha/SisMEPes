import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDiary } from '@/hooks/useDiary';
import { Logo } from '@/components/ui/Logo';
import { WeatherCard } from '@/components/feature/WeatherCard';
import { QuickActionButton } from '@/components/feature/QuickActionButton';
import { DiaryCard } from '@/components/feature/DiaryCard';
import { theme } from '@/constants/theme';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { recentEntries, refreshEntries } = useDiary();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshEntries();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Logo size={120} />
        <TouchableOpacity style={styles.syncButton} onPress={handleRefresh}>
          <Ionicons name="sync" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <WeatherCard />

        <View style={styles.quickActions}>
          <QuickActionButton
            icon="location"
            label="Pontos de Pesca"
            onPress={() => router.push('/fishing-spots')}
          />
          <QuickActionButton
            icon="book"
            label="Meu Diário"
            onPress={() => router.push('/all-diaries')}
          />
          <QuickActionButton
            icon="fish"
            label="Minhas Capturas"
            onPress={() => router.push('/all-diaries')}
          />
          <QuickActionButton
            icon="add-circle"
            label="Novo Ponto"
            onPress={() => router.push('/add-spot')}
          />
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/add-diary')}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={28} color={theme.colors.text.inverse} />
          <Text style={styles.createButtonText}>Criar novo Diário</Text>
        </TouchableOpacity>

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <View>
              <Text style={styles.recentTitle}>Diários Recentes</Text>
              <Text style={styles.recentSubtitle}>Seg, 10 de novembro 2025</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/all-diaries')}>
              <Text style={styles.viewAllButton}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {recentEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={48} color={theme.colors.text.secondary} />
              <Text style={styles.emptyText}>Nenhum diário criado</Text>
              <Text style={styles.emptySubtext}>Crie seu primeiro diário de pesca</Text>
            </View>
          ) : (
            recentEntries.map((entry) => <DiaryCard key={entry.id} entry={entry} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.white,
  },
  header: {
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  syncButton: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  createButton: {
    backgroundColor: theme.colors.accent,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.sm,
  },
  recentSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  recentTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  recentSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  viewAllButton: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  emptySubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.placeholder,
    marginTop: theme.spacing.xs,
  },
});

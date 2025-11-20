import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
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

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.md }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Olá, Pescador</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>
          <TouchableOpacity style={styles.syncButton} onPress={handleRefresh}>
            <Ionicons name="sync" size={20} color={theme.colors.text.inverse} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        <View style={styles.weatherContainer}>
          <WeatherCard />
        </View>

        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        <View style={styles.quickActions}>
          <QuickActionButton
            icon="location"
            label="Pontos"
            onPress={() => router.push('/fishing-spots')}
          />
          <QuickActionButton
            icon="book"
            label="Diário"
            onPress={() => router.push('/all-diaries')}
          />
          <QuickActionButton
            icon="fish"
            label="Capturas"
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
          activeOpacity={0.9}
        >
          <View style={styles.createIcon}>
            <Ionicons name="add" size={32} color={theme.colors.text.inverse} />
          </View>
          <View>
            <Text style={styles.createButtonText}>Novo Registro</Text>
            <Text style={styles.createButtonSubtext}>Adicionar ao diário</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.5)" style={styles.chevron} />
        </TouchableOpacity>

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recentes</Text>
            <TouchableOpacity onPress={() => router.push('/all-diaries')}>
              <Text style={styles.viewAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {recentEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="journal-outline" size={48} color={theme.colors.text.placeholder} />
              <Text style={styles.emptyText}>Nenhum registro recente</Text>
              <Text style={styles.emptySubtext}>Seus registros de pesca aparecerão aqui</Text>
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
    backgroundColor: theme.colors.background.light,
  },
  header: {
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  syncButton: {
    padding: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.full,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  weatherContainer: {
    marginTop: -theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  createButton: {
    backgroundColor: theme.colors.accent,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  createIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  createButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  createButtonSubtext: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  chevron: {
    marginLeft: 'auto',
  },
  recentSection: {
    paddingHorizontal: theme.spacing.lg,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  viewAllText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: theme.fontSize.md,
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

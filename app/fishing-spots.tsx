import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFishingSpots } from '@/hooks/useFishingSpots';
import { SpotCard } from '@/components/feature/SpotCard';
import { theme } from '@/constants/theme';

export default function FishingSpotsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { spots, loading } = useFishingSpots();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.text.inverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pontos de Pesca</Text>
        <TouchableOpacity onPress={() => router.push('/add-spot')} style={styles.addButton}>
          <Ionicons name="add" size={28} color={theme.colors.text.inverse} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={spots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SpotCard spot={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={64} color={theme.colors.text.secondary} />
            <Text style={styles.emptyText}>
              {loading ? 'Carregando...' : 'Nenhum ponto cadastrado'}
            </Text>
            <Text style={styles.emptySubtext}>
              Adicione seu primeiro ponto de pesca
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => router.push('/add-spot')}
            >
              <Ionicons name="add-circle" size={24} color={theme.colors.text.inverse} />
              <Text style={styles.emptyButtonText}>Adicionar Ponto</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
  backButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  addButton: {
    padding: theme.spacing.xs,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.lg,
  },
  emptySubtext: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.placeholder,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
  },
  emptyButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.sm,
  },
});

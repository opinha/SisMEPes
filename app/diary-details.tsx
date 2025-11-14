import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useDiary } from '@/hooks/useDiary';
import { useFishCatch } from '@/hooks/useFishCatch';
import { theme } from '@/constants/theme';

export default function DiaryDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries } = useDiary();
  const { catches, loadCatchesByDiary } = useFishCatch();

  const diary = entries.find((e) => e.id === id);
  const fishCatches = catches[id] || [];

  useEffect(() => {
    if (id) {
      loadCatchesByDiary(id);
    }
  }, [id]);

  if (!diary) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={theme.colors.text.inverse} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Diário</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Diário não encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.text.inverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Diário</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.diaryTitle}>{diary.title}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>{diary.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="fish" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>{diary.fish_count} peixes cadastrados</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>
              {new Date(diary.date).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Peixes Pescados</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push(`/add-fish?diaryId=${id}`)}
          >
            <Ionicons name="add-circle" size={56} color={theme.colors.secondary} />
          </TouchableOpacity>
        </View>

        {fishCatches.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="fish-outline" size={48} color={theme.colors.text.secondary} />
            <Text style={styles.emptyStateText}>Nenhum peixe cadastrado</Text>
            <Text style={styles.emptyStateSubtext}>
              Toque no botão + acima para adicionar
            </Text>
          </View>
        ) : (
          <View style={styles.fishList}>
            {fishCatches.map((fish) => (
              <View key={fish.id} style={styles.fishCard}>
                {fish.photo_url && (
                  <Image source={{ uri: fish.photo_url }} style={styles.fishPhoto} />
                )}
                <View style={styles.fishInfo}>
                  <Text style={styles.fishSpecies}>{fish.species}</Text>
                  <View style={styles.fishDetails}>
                    {fish.size_cm && (
                      <Text style={styles.fishDetail}>Tamanho: {fish.size_cm}cm</Text>
                    )}
                    {fish.weight_kg && (
                      <Text style={styles.fishDetail}>Peso: {fish.weight_kg}kg</Text>
                    )}
                    {fish.bait && (
                      <Text style={styles.fishDetail}>Isca: {fish.bait}</Text>
                    )}
                  </View>
                  {fish.notes && (
                    <Text style={styles.fishNotes}>{fish.notes}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
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
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  infoCard: {
    backgroundColor: theme.colors.background.card,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.card,
  },
  diaryTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  addButton: {
    padding: theme.spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    marginHorizontal: theme.spacing.lg,
  },
  emptyStateText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  emptyStateSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.placeholder,
    marginTop: theme.spacing.xs,
  },
  fishList: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  fishCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border.card,
  },
  fishPhoto: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.background.light,
  },
  fishInfo: {
    padding: theme.spacing.md,
  },
  fishSpecies: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  fishDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  fishDetail: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    backgroundColor: theme.colors.background.light,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  fishNotes: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.secondary,
  },
});

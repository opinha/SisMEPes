import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDiary } from '@/hooks/useDiary';
import { useAlert } from '@/template';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

export default function AddDiaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { createEntry } = useDiary();
  const { showAlert } = useAlert();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [fishCount, setFishCount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      showAlert('Erro', 'Digite o título do diário');
      return;
    }

    if (!location.trim()) {
      showAlert('Erro', 'Digite o local');
      return;
    }

    const count = parseInt(fishCount);
    if (isNaN(count) || count < 0) {
      showAlert('Erro', 'Digite um número válido de peixes');
      return;
    }

    setLoading(true);
    const { error } = await createEntry({
      title: title.trim(),
      location: location.trim(),
      fish_count: count,
    });
    setLoading(false);

    if (error) {
      showAlert('Erro', error);
    } else {
      showAlert('Sucesso', 'Diário criado com sucesso');
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.text.inverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Diário</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título</Text>
            <Input
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Pescaria no Rio Grande"
              variant="dark"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Local</Text>
            <Input
              value={location}
              onChangeText={setLocation}
              placeholder="Ex: Lagoa do Peixe"
              variant="dark"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantidade de Peixes</Text>
            <Input
              value={fishCount}
              onChangeText={setFishCount}
              placeholder="Ex: 15"
              keyboardType="number-pad"
              variant="dark"
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + theme.spacing.md }]}>
        <Button
          title="SALVAR DIÁRIO"
          onPress={handleSubmit}
          loading={loading}
          variant="secondary"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    padding: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.background.light,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
});

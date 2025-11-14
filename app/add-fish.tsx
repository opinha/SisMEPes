import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useFishCatch } from '@/hooks/useFishCatch';
import { fishCatchService } from '@/services/fishCatchService';
import { useAlert } from '@/template';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

export default function AddFishScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { diaryId } = useLocalSearchParams<{ diaryId: string }>();
  const { createCatch } = useFishCatch();
  const { showAlert } = useAlert();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [species, setSpecies] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [bait, setBait] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const result = await fishCatchService.pickImage();
    if (result.error) {
      showAlert('Erro', result.error);
    } else if (result.uri) {
      setPhotoUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (!species.trim()) {
      showAlert('Erro', 'Digite a espécie do peixe');
      return;
    }

    setLoading(true);
    const { error } = await createCatch({
      diary_entry_id: diaryId,
      species: species.trim(),
      size_cm: size ? parseFloat(size) : undefined,
      weight_kg: weight ? parseFloat(weight) : undefined,
      bait: bait.trim() || undefined,
      notes: notes.trim() || undefined,
      photo_uri: photoUri || undefined,
    });
    setLoading(false);

    if (error) {
      showAlert('Erro', error);
    } else {
      showAlert('Sucesso', 'Peixe adicionado com sucesso');
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
        <Text style={styles.headerTitle}>Nova Captura</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.photoContainer} onPress={handlePickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={48} color={theme.colors.text.secondary} />
              <Text style={styles.photoPlaceholderText}>Adicionar Foto do Peixe</Text>
              <Text style={styles.photoPlaceholderSubtext}>Toque aqui para fazer o upload</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Espécie do Peixe *</Text>
            <Input
              value={species}
              onChangeText={setSpecies}
              placeholder="Ex: Tucunaré"
              variant="light"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Tamanho (cm)</Text>
              <Input
                value={size}
                onChangeText={setSize}
                placeholder="Ex: 45"
                keyboardType="decimal-pad"
                variant="light"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Peso (kg)</Text>
              <Input
                value={weight}
                onChangeText={setWeight}
                placeholder="Ex: 2.5"
                keyboardType="decimal-pad"
                variant="light"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Isca Utilizada</Text>
            <Input
              value={bait}
              onChangeText={setBait}
              placeholder="Ex: Isca de superfície"
              variant="light"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Observações</Text>
            <Input
              value={notes}
              onChangeText={setNotes}
              placeholder="Descreva as condições do tempo, comportamento do peixe..."
              multiline
              numberOfLines={4}
              variant="light"
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + theme.spacing.md }]}>
        <Button
          title="SALVAR CAPTURA"
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
  photoContainer: {
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.background.light,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderStyle: 'dashed',
  },
  photo: {
    width: '100%',
    height: 250,
  },
  photoPlaceholder: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
  },
  photoPlaceholderSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.placeholder,
    marginTop: theme.spacing.xs,
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
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.background.light,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
});

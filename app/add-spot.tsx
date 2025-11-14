import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFishingSpots } from '@/hooks/useFishingSpots';
import { useAlert } from '@/template';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

export default function AddSpotScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { createSpot } = useFishingSpots();
  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleGetCurrentLocation = async () => {
    setGettingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showAlert('Erro', 'Permissão de localização negada');
        setGettingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toFixed(8));
      setLongitude(location.coords.longitude.toFixed(8));
      showAlert('Sucesso', 'Localização obtida com sucesso');
    } catch (error) {
      showAlert('Erro', 'Não foi possível obter a localização');
    } finally {
      setGettingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      showAlert('Erro', 'Digite o nome do ponto');
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      showAlert('Erro', 'Coordenadas inválidas');
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      showAlert('Erro', 'Coordenadas fora do intervalo válido');
      return;
    }

    setLoading(true);
    const { error } = await createSpot({
      name: name.trim(),
      latitude: lat,
      longitude: lng,
    });
    setLoading(false);

    if (error) {
      showAlert('Erro', error);
    } else {
      showAlert('Sucesso', 'Ponto cadastrado com sucesso');
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
          <Ionicons name="arrow-back" size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Ponto</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Ponto</Text>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Ex: Lagoa do Peixe"
              variant="dark"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Localização (Coordenadas)</Text>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={handleGetCurrentLocation}
              disabled={gettingLocation}
            >
              <Ionicons
                name="navigate"
                size={20}
                color={gettingLocation ? theme.colors.text.secondary : theme.colors.secondary}
              />
              <Text
                style={[
                  styles.locationButtonText,
                  gettingLocation && styles.locationButtonTextDisabled,
                ]}
              >
                {gettingLocation ? 'Obtendo localização...' : 'Toque no ícone para obter localização atual'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coordinatesRow}>
            <View style={styles.coordinateInput}>
              <Text style={styles.label}>Latitude</Text>
              <Input
                value={latitude}
                onChangeText={setLatitude}
                placeholder="Ex: -23.550520"
                keyboardType="decimal-pad"
                variant="dark"
              />
            </View>

            <View style={styles.coordinateInput}>
              <Text style={styles.label}>Longitude</Text>
              <Input
                value={longitude}
                onChangeText={setLongitude}
                placeholder="Ex: -46.633308"
                keyboardType="decimal-pad"
                variant="dark"
              />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>
              Use o botão de localização ou insira as coordenadas manualmente
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + theme.spacing.md }]}>
        <Button
          title="SALVAR PONTO"
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
    backgroundColor: theme.colors.background.darker,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.black,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
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
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
  },
  locationButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  locationButtonTextDisabled: {
    color: theme.colors.text.placeholder,
  },
  coordinatesRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  coordinateInput: {
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.background.black,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primary,
  },
});

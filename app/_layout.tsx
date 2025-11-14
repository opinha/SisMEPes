import { Stack } from 'expo-router';
import { AuthProvider, AlertProvider } from '@/template';
import { FishingSpotProvider } from '@/contexts/FishingSpotContext';
import { DiaryProvider } from '@/contexts/DiaryContext';
import { FishCatchProvider } from '@/contexts/FishCatchContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <AuthProvider>
        <FishingSpotProvider>
          <DiaryProvider>
            <FishCatchProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="add-spot" options={{ headerShown: false }} />
                <Stack.Screen name="add-diary" options={{ headerShown: false }} />
                <Stack.Screen name="all-diaries" options={{ headerShown: false }} />
                <Stack.Screen name="diary-details" options={{ headerShown: false }} />
                <Stack.Screen name="add-fish" options={{ headerShown: false }} />
                <Stack.Screen name="fishing-spots" options={{ headerShown: false }} />
              </Stack>
            </FishCatchProvider>
          </DiaryProvider>
        </FishingSpotProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

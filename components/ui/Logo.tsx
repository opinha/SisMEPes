import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 120 }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source="https://cdn-ai.onspace.ai/onspace/project/image/GZJ9h6fqM836ZGZDajkZyD/Sem_nome_(1800_x_1080_px)_(1).svg"
        style={[styles.logo, { width: size, height: size }]}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
});

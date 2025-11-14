import { useContext } from 'react';
import { FishingSpotContext } from '@/contexts/FishingSpotContext';

export function useFishingSpots() {
  const context = useContext(FishingSpotContext);
  if (!context) {
    throw new Error('useFishingSpots must be used within FishingSpotProvider');
  }
  return context;
}

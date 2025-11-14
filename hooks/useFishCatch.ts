import { useContext } from 'react';
import { FishCatchContext } from '@/contexts/FishCatchContext';

export function useFishCatch() {
  const context = useContext(FishCatchContext);
  if (!context) {
    throw new Error('useFishCatch must be used within FishCatchProvider');
  }
  return context;
}

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/template';
import { fishingSpotService, FishingSpot, CreateFishingSpotInput } from '@/services/fishingSpotService';

interface FishingSpotContextType {
  spots: FishingSpot[];
  loading: boolean;
  createSpot: (input: CreateFishingSpotInput) => Promise<{ error: string | null }>;
  deleteSpot: (id: string) => Promise<{ error: string | null }>;
  refreshSpots: () => Promise<void>;
}

export const FishingSpotContext = createContext<FishingSpotContextType | undefined>(undefined);

export function FishingSpotProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [spots, setSpots] = useState<FishingSpot[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSpots = async () => {
    setLoading(true);
    const { data, error } = await fishingSpotService.getAll();
    if (!error && data) {
      setSpots(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadSpots();
    } else {
      setSpots([]);
      setLoading(false);
    }
  }, [user]);

  const createSpot = async (input: CreateFishingSpotInput) => {
    const { data, error } = await fishingSpotService.create(input);
    if (!error && data) {
      setSpots([data, ...spots]);
    }
    return { error };
  };

  const deleteSpot = async (id: string) => {
    const { error } = await fishingSpotService.delete(id);
    if (!error) {
      setSpots(spots.filter(spot => spot.id !== id));
    }
    return { error };
  };

  return (
    <FishingSpotContext.Provider
      value={{
        spots,
        loading,
        createSpot,
        deleteSpot,
        refreshSpots: loadSpots,
      }}
    >
      {children}
    </FishingSpotContext.Provider>
  );
}

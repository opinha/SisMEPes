import { createContext, useState, ReactNode } from 'react';
import { fishCatchService, FishCatch, CreateFishCatchInput } from '@/services/fishCatchService';

interface FishCatchContextType {
  catches: Record<string, FishCatch[]>;
  loading: boolean;
  loadCatchesByDiary: (diaryId: string) => Promise<void>;
  createCatch: (input: CreateFishCatchInput) => Promise<{ data: FishCatch | null; error: string | null }>;
  deleteCatch: (id: string, diaryId: string) => Promise<{ error: string | null }>;
}

export const FishCatchContext = createContext<FishCatchContextType | undefined>(undefined);

export function FishCatchProvider({ children }: { children: ReactNode }) {
  const [catches, setCatches] = useState<Record<string, FishCatch[]>>({});
  const [loading, setLoading] = useState(false);

  const loadCatchesByDiary = async (diaryId: string) => {
    setLoading(true);
    const result = await fishCatchService.getByDiaryId(diaryId);
    if (!result.error && result.data) {
      setCatches((prev) => ({ ...prev, [diaryId]: result.data! }));
    }
    setLoading(false);
  };

  const createCatch = async (input: CreateFishCatchInput) => {
    const result = await fishCatchService.create(input);
    if (!result.error && result.data) {
      setCatches((prev) => ({
        ...prev,
        [input.diary_entry_id]: [result.data!, ...(prev[input.diary_entry_id] || [])],
      }));
    }
    return result;
  };

  const deleteCatch = async (id: string, diaryId: string) => {
    const result = await fishCatchService.delete(id);
    if (!result.error) {
      setCatches((prev) => ({
        ...prev,
        [diaryId]: (prev[diaryId] || []).filter((c) => c.id !== id),
      }));
    }
    return result;
  };

  return (
    <FishCatchContext.Provider
      value={{
        catches,
        loading,
        loadCatchesByDiary,
        createCatch,
        deleteCatch,
      }}
    >
      {children}
    </FishCatchContext.Provider>
  );
}

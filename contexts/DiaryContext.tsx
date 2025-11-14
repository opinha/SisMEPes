import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/template';
import { diaryService, DiaryEntry, CreateDiaryInput } from '@/services/diaryService';

interface DiaryContextType {
  entries: DiaryEntry[];
  recentEntries: DiaryEntry[];
  loading: boolean;
  createEntry: (input: CreateDiaryInput) => Promise<{ data: DiaryEntry | null; error: string | null }>;
  deleteEntry: (id: string) => Promise<{ error: string | null }>;
  refreshEntries: () => Promise<void>;
}

export const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export function DiaryProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [recentEntries, setRecentEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    if (!user) {
      setEntries([]);
      setRecentEntries([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const [allResult, recentResult] = await Promise.all([
      diaryService.getAll(),
      diaryService.getRecent(3),
    ]);

    if (!allResult.error && allResult.data) {
      setEntries(allResult.data);
    }

    if (!recentResult.error && recentResult.data) {
      setRecentEntries(recentResult.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, [user]);

  const createEntry = async (input: CreateDiaryInput) => {
    const result = await diaryService.create(input);
    if (!result.error && result.data) {
      setEntries((prev) => [result.data!, ...prev]);
      setRecentEntries((prev) => [result.data!, ...prev.slice(0, 2)]);
    }
    return result;
  };

  const deleteEntry = async (id: string) => {
    const result = await diaryService.delete(id);
    if (!result.error) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setRecentEntries((prev) => prev.filter((e) => e.id !== id));
    }
    return result;
  };

  const refreshEntries = async () => {
    await loadEntries();
  };

  return (
    <DiaryContext.Provider
      value={{
        entries,
        recentEntries,
        loading,
        createEntry,
        deleteEntry,
        refreshEntries,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
}

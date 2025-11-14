import { getSupabaseClient } from '@/template';

export interface DiaryEntry {
  id: string;
  user_id: string;
  title: string;
  location: string;
  fish_count: number;
  date: string;
  created_at: string;
}

export interface CreateDiaryInput {
  title: string;
  location: string;
  fish_count: number;
  date?: string;
}

export const diaryService = {
  async getAll(): Promise<{ data: DiaryEntry[] | null; error: string | null }> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  },

  async getRecent(limit: number = 3): Promise<{ data: DiaryEntry[] | null; error: string | null }> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  },

  async create(input: CreateDiaryInput): Promise<{ data: DiaryEntry | null; error: string | null }> {
    const supabase = getSupabaseClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      return { data: null, error: 'Usuário não autenticado' };
    }

    const { data, error } = await supabase
      .from('diary_entries')
      .insert({
        user_id: userData.user.id,
        title: input.title,
        location: input.location,
        fish_count: input.fish_count,
        date: input.date || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  },

  async delete(id: string): Promise<{ error: string | null }> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('diary_entries')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  },
};

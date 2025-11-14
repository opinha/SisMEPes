import { getSupabaseClient } from '@/template';

export interface FishingSpot {
  id: string;
  user_id: string;
  name: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface CreateFishingSpotInput {
  name: string;
  latitude: number;
  longitude: number;
}

const supabase = getSupabaseClient();

export const fishingSpotService = {
  async getAll(): Promise<{ data: FishingSpot[] | null; error: string | null }> {
    const { data, error } = await supabase
      .from('fishing_spots')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  },

  async create(input: CreateFishingSpotInput): Promise<{ data: FishingSpot | null; error: string | null }> {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) {
      return { data: null, error: 'Usuário não autenticado' };
    }

    const { data, error } = await supabase
      .from('fishing_spots')
      .insert({
        user_id: userData.user.id,
        name: input.name,
        latitude: input.latitude,
        longitude: input.longitude,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  },

  async delete(id: string): Promise<{ error: string | null }> {
    const { error } = await supabase
      .from('fishing_spots')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  },
};

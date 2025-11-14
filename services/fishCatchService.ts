import { getSupabaseClient } from '@/template';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export interface FishCatch {
  id: string;
  diary_entry_id: string;
  user_id: string;
  species: string;
  size_cm: number | null;
  weight_kg: number | null;
  bait: string | null;
  notes: string | null;
  photo_url: string | null;
  created_at: string;
}

export interface CreateFishCatchInput {
  diary_entry_id: string;
  species: string;
  size_cm?: number;
  weight_kg?: number;
  bait?: string;
  notes?: string;
  photo_uri?: string;
}

export const fishCatchService = {
  async getByDiaryId(diaryId: string): Promise<{ data: FishCatch[] | null; error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('fish_catches')
        .select('*')
        .eq('diary_entry_id', diaryId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },

  async create(input: CreateFishCatchInput): Promise<{ data: FishCatch | null; error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      let photoUrl: string | null = null;

      // Upload photo if provided
      if (input.photo_uri) {
        const uploadResult = await this.uploadPhoto(input.photo_uri, user.id);
        if (uploadResult.error) throw new Error(uploadResult.error);
        photoUrl = uploadResult.url;
      }

      const { data, error } = await supabase
        .from('fish_catches')
        .insert({
          diary_entry_id: input.diary_entry_id,
          user_id: user.id,
          species: input.species,
          size_cm: input.size_cm || null,
          weight_kg: input.weight_kg || null,
          bait: input.bait || null,
          notes: input.notes || null,
          photo_url: photoUrl,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },

  async delete(id: string): Promise<{ error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('fish_catches')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: (error as Error).message };
    }
  },

  async uploadPhoto(uri: string, userId: string): Promise<{ url: string | null; error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      const fileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;

      let fileData: ArrayBuffer;

      if (Platform.OS === 'web') {
        const response = await fetch(uri);
        const blob = await response.blob();
        fileData = await blob.arrayBuffer();
      } else {
        const response = await fetch(uri);
        const blob = await response.blob();
        fileData = await new Promise<ArrayBuffer>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as ArrayBuffer);
          reader.readAsArrayBuffer(blob);
        });
      }

      const { error: uploadError } = await supabase.storage
        .from('fish-photos')
        .upload(fileName, fileData, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('fish-photos')
        .getPublicUrl(fileName);

      return { url: urlData.publicUrl, error: null };
    } catch (error) {
      return { url: null, error: (error as Error).message };
    }
  },

  async pickImage(): Promise<{ uri: string | null; error: string | null }> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return { uri: null, error: 'Permissão de câmera negada' };
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled) {
        return { uri: null, error: null };
      }

      return { uri: result.assets[0].uri, error: null };
    } catch (error) {
      return { uri: null, error: (error as Error).message };
    }
  },
};

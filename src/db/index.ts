import { IDatabase, IPriceItem } from '@/types/database';
import { createClient } from '@supabase/supabase-js';

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error('Database connection credentials not found');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<IDatabase>(
  // TODO: setup locally
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// TODO: enable row level security and policies

export const getItems = async () => {
  const { data } = await supabase // TODO: handle error
    .from('price_items')
    .select()
    .returns<IPriceItem[]>();

  return data;
};
export const getItem = async (id: number) => {
  const { data } = await supabase
    .from('price_items')
    .select()
    .eq('id', id)
    .single<IPriceItem>();

  return data;
};

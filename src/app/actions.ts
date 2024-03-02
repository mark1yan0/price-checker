'use server';

import { supabase } from '@/db';
import { getItemFormPayload } from '@/lib/helpers/helpers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createItemAction(formData: FormData) {
  const payload = getItemFormPayload(formData);

  let createdId = '';
  try {
    const res = await supabase
      .from('price_items')
      .insert(payload)
      .select()
      .single();
    createdId = res.data.id;
  } catch (error) {
    console.error(error);
  }

  if (createdId) {
    revalidatePath('/');
    redirect(`/brands/${createdId}`);
  }
}

export async function updateItemAction(id: number, formData: FormData) {
  const payload = getItemFormPayload(formData);
  try {
    await supabase.from('price_items').update(payload).eq('id', id);
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/');
  revalidatePath(`/brands/${id}`);
}

export async function deleteItemAction(id: number) {
  try {
    await supabase.from('price_items').delete().eq('id', id);
  } catch (error) {
    console.error(error);
  }
  revalidatePath('/');
  redirect('/');
}

import { IPriceItem } from '@/types/database';

export function getItemFormPayload(formData: FormData): Omit<IPriceItem, 'id'> {
  // TODO: add zod validation

  return {
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    css_selector: formData.get('css_selector') as string,
    base_price: parseFloat(formData.get('base_price') as string),
  };
}

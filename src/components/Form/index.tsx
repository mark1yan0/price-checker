'use client';

import { supabase } from '@/db/client';
import { IPriceItem } from '@/types/database';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

// TODO: handle with server actions
const Form = ({ initialValues }: { initialValues?: IPriceItem }) => {
  const router = useRouter();
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      url: { value: string };
      css_selector: { value: string };
      base_price: { value: number }; // TODO: check and validate as number
    };

    console.log(typeof target.base_price.value);

    // TODO: add validation
    try {
      if (initialValues) {
        // update
        const res = await supabase
          .from('price_items')
          .update({
            name: target.name.value,
            url: target.url.value,
            css_selector: target.css_selector.value,
            base_price: target.base_price.value,
          })
          .eq('id', initialValues.id);
        console.log('updated', res);
        // TODO: see how to update ui
        router.replace(`/brands/${initialValues.id}`);
      } else {
        // create
        const res = await supabase
          .from('price_items')
          .insert({
            name: target.name.value,
            url: target.url.value,
            css_selector: target.css_selector.value,
            base_price: target.base_price.value,
          })
          .select()
          .single();
        router.replace(`/brands/${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }

    // TODO: add an action after creation succes
  }

  // TODO: add update
  return (
    <form onSubmit={submitHandler} className='flex flex-col gap-2'>
      <div>
        <div className='flex gap-2'>
          <Field
            name='name'
            label='Name'
            required
            defaultValue={initialValues ? initialValues.name : undefined}
          />
          <Field
            name='url'
            label='Url'
            required
            defaultValue={initialValues ? initialValues.url : undefined}
          />
        </div>

        <div className='flex gap-2'>
          <Field
            name='css_selector'
            label='Selector'
            required
            defaultValue={
              initialValues ? initialValues.css_selector : undefined
            }
          />
          <Field
            name='base_price'
            label='BasePrice'
            type='number'
            step='0.01'
            required
            defaultValue={initialValues ? initialValues.base_price : undefined}
          />
        </div>
      </div>

      <input type='submit' value={initialValues ? 'update' : 'create'} />
    </form>
  );
};

export default Form;

const Field = ({
  name,
  label,
  type,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string }) => {
  return (
    <label htmlFor={name} className='w-full'>
      {label}
      <input
        type={type ?? 'text'}
        name={name}
        className='block w-full rounded-sm p-2'
        {...props}
      />
    </label>
  );
};

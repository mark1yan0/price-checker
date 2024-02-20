import Delete from '@/components/DeleteButton';
import Form from '@/components/Form';
import { supabase } from '@/db/client';
import { IPriceItem } from '@/types/database';
import Link from 'next/link';

interface IResponseData {
  data: {
    item: IPriceItem;
    currentPrice: number;
  };
  status: 'ok';
}

async function getData(body: Omit<IPriceItem, 'id'>) {
  const res = await fetch('http://localhost:3000/api/brands', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: IResponseData = await res.json();

  return data.data;
}

// TODO: refactor
export default async function Brand({ params }: { params: { id: number } }) {
  const { data: item } = await supabase
    .from('price_items')
    .select()
    .eq('id', params.id)
    .single<IPriceItem>(); // todo: handle error

  if (!item) {
    return 'no item found';
  }

  const data = await getData(item);
  return (
    <>
      <Link href='/'>Go back</Link>
      <h1 className='text-[5rem]'>{item.name}</h1>
      <Delete id={item.id} />
      <br />
      <Link href={item.url} target='_blank'>
        {item.url}
      </Link>
      <div className='mt-4 flex w-full items-center justify-center gap-8'>
        <PriceDisplay label='Initial' price={item.base_price} />
        <PriceDisplay label='Current' price={data.currentPrice} />
      </div>

      <Form
        initialValues={{
          id: item.id,
          name: item.name,
          url: item.url,
          css_selector: item.css_selector,
          base_price: item.base_price,
        }}
      />
    </>
  );
}

// TODO: update values after mutation

const PriceDisplay = ({ label, price }: { label: string; price: number }) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <h2 className='text-[2rem]'>{label}</h2>
      <span className='text-[3rem]'>{price}</span>
    </div>
  );
};

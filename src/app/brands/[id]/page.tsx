import Delete from '@/components/DeleteButton';
import Form from '@/components/Form';
import { getItem } from '@/db';
import { IPriceItem } from '@/types/database';
import Link from 'next/link';
import { updateItemAction } from '@/app/actions';

interface IResponseData {
  data: {
    item: IPriceItem;
    currentPrice: number;
  };
  status: 'ok';
}

async function fetchCurrentPrice(body: Omit<IPriceItem, 'id'>) {
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

export default async function Brand({ params }: { params: { id: number } }) {
  const item = await getItem(params.id);

  if (!item) {
    return 'no item found';
  }

  const data = await fetchCurrentPrice(item);
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

      <UpdateItemForm item={item} />
    </>
  );
}

const UpdateItemForm = ({ item }: { item: IPriceItem }) => {
  const updateItemActionWithId = updateItemAction.bind(null, item.id);
  return (
    <Form
      initialValues={{
        id: item.id,
        name: item.name,
        url: item.url,
        css_selector: item.css_selector,
        base_price: item.base_price,
      }}
      action={updateItemActionWithId}
    />
  );
};

const PriceDisplay = ({ label, price }: { label: string; price: number }) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <h2 className='text-[2rem]'>{label}</h2>
      <span className='text-[3rem]'>{price}</span>
    </div>
  );
};

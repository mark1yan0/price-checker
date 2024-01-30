import { IItem } from '@/lib/interfaces/item';
import Link from 'next/link';

interface IResponseData {
  data: {
    item: IItem;
    currentPrice: number;
  };
  status: 'ok';
}

async function getData(body: IItem) {
  const res = await fetch(`http://localhost:3000/api/brands`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: IResponseData = await res.json();

  return data.data;
}

export default async function Brand({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugData: IItem = {
    name: decodeURIComponent(params.slug[0]),
    url: decodeURIComponent(params.slug[1]),
    selector: decodeURIComponent(params.slug[2]),
    basePrice: parseFloat(decodeURIComponent(params.slug[3])),
  };

  const data = await getData(slugData);
  return (
    <>
      <Link href='/brands'>Go back</Link>
      <h1 className='text-[5rem]'>{data.item.name}</h1>

      <Link href={data.item.url} target='_blank'>
        {data.item.url}
      </Link>

      <div className='flex gap-8 items-center w-full justify-center mt-4'>
        <PriceDisplay label='Initial' price={data.item.basePrice} />
        <PriceDisplay label='Current' price={data.currentPrice} />
      </div>
    </>
  );
}

const PriceDisplay = ({ label, price }: { label: string; price: number }) => {
  return (
    <div className='flex flex-col gap-2 items-center'>
      <h2 className='text-[2rem]'>{label}</h2>
      <span className='text-[3rem]'>{price}</span>
    </div>
  );
};

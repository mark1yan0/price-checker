import Form from '@/components/Form';
import { getItem } from '@/db';
import { IPriceItem } from '@/types/database';
import Link from 'next/link';
import { updateItemAction } from '@/app/actions';
import DeleteButton from '@/components/Buttons/DeleteButton';
import Button from '@/components/Buttons';
import { twMerge } from 'tailwind-merge';
import EditButton from '@/components/Buttons/EditButton';

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
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Go back
        </Link>
        <div className="flex items-center gap-2">
          <EditButton item={item} />
          <DeleteButton id={item.id} />
        </div>
      </div>

      <h1 className="mb-6 mt-10 text-2xl sm:text-[3rem] md:text-[5rem]">
        <Link href={item.url} target="_blank">
          {item.name}
        </Link>
      </h1>

      <br />

      <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
        <PriceDisplay label="Initial" price={item.base_price} />
        <PriceDisplay
          label="Current"
          price={data.currentPrice}
          difference={
            item.base_price === data.currentPrice
              ? 'none'
              : item.base_price < data.currentPrice
                ? 'negative'
                : 'positive'
          }
        />
      </div>
    </>
  );
}

const PriceDisplay = ({
  label,
  price,
  difference,
}: {
  label: string;
  price: number;
  difference?: 'positive' | 'negative' | 'none';
}) => {
  return (
    <div className="-bg--color-surface-100 flex min-w-[300px] flex-col items-center gap-2 rounded-lg p-6">
      <h2 className="text-[1rem]">{label}</h2>
      <span
        className={twMerge(
          'flex items-center gap-2 text-[2rem] sm:text-[3rem]',
          difference && difference !== 'none'
            ? difference === 'negative'
              ? 'text-red-400'
              : 'text-green-400'
            : null,
        )}
      >
        {difference && difference !== 'none' ? (
          <svg
            width="20"
            height="20"
            className={twMerge(
              difference === 'negative'
                ? 'stroke-red-400'
                : 'rotate-180 stroke-green-400',
            )}
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : null}
        {formatCurrency(price)}
      </span>
    </div>
  );
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

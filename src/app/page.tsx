import { supabase } from '@/db/client';
import { IPriceItem } from '@/types/database';
import Link from 'next/link';

export default async function Home() {
  const { data } = await supabase // TODO: handle error
    .from('price_items')
    .select()
    .returns<IPriceItem[]>();
  return (
    <>
      <Link href='/brands/new'>New</Link>

      <h2 className='mb-4 mt-8 text-2xl'>my list</h2>

      {!data ? (
        <p>No data</p>
      ) : (
        data.map(item => {
          return (
            <Link
              key={item.id}
              className='mb-2 block transition-all hover:border-b-2'
              href={`/brands/${item.id}`}
            >
              {item.name}
            </Link>
          );
        })
      )}
    </>
  );
}

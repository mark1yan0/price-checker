import { getItems } from '@/db';
import { IPriceItem } from '@/types/database';
import Link from 'next/link';

export default async function Home() {
  const data = await getItems();
  return (
    <>
      <h2 className="mb-4 mt-8 text-2xl">my list</h2>

      {!data ? (
        <p>No data</p>
      ) : (
        data.map((item) => {
          return <ListItem item={item} key={item.id} />;
        })
      )}

      <AddNewButton />
    </>
  );
}

const ListItem = ({ item }: { item: IPriceItem }) => {
  return (
    <Link
      className="-bg--color-surface-100 hover:-bg--color-primary-300 mb-2 block rounded border p-2 transition-all"
      href={`/brands/${item.id}`}
    >
      {item.name}
    </Link>
  );
};

const AddNewButton = () => {
  return (
    <Link
      className="-bg--color-primary-300 fixed bottom-5 left-[50%] rounded-full  p-3"
      href="/brands/new"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        stroke="white"
        className="stroke-1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </Link>
  );
};

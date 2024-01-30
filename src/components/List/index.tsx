'use client';

import Link from 'next/link';

const List = () => {
  const list = localStorage.getItem('list');

  if (!list) {
    return 'no items found';
  }

  const parsed = JSON.parse(list);
  const items = Object.keys(parsed);

  return items.map((item, i) => {
    const found = parsed[item];
    return (
      <Link
        key={item + i}
        href={`/brands/${item}/${encodeURIComponent(found.url)}/${
          found.selector
        }/${encodeURIComponent(found.basePrice)}`}
      >
        {item}
      </Link>
    );
  });
};

export default List;

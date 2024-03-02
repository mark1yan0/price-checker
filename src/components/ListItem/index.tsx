'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IPriceItem } from '@/types/database';
import { bounceOnTapVariant } from '@/lib/animations';

const ListItem = ({ item }: { item: IPriceItem }) => {
  return (
    <motion.span
      className="block"
      variants={bounceOnTapVariant}
      initial="initial"
      whileTap="animate"
    >
      <Link
        className="-bg--color-surface-100 hover:-bg--color-primary-300 mb-2 block rounded border p-2 transition-all"
        href={`/brands/${item.id}`}
      >
        {item.name}
      </Link>
    </motion.span>
  );
};

export default ListItem;

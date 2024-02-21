'use client';

import { deleteItemAction } from '@/app/actions';

const Delete = ({ id }: { id: number }) => {
  return <button onClick={() => deleteItemAction(id)}>Delete</button>;
};

export default Delete;

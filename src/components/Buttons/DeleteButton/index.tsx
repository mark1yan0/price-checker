'use client';

import { deleteItemAction } from '@/app/actions';
import Button from '..';

const Delete = ({ id }: { id: number }) => {
  return (
    <Button variant="danger" onClick={() => deleteItemAction(id)}>
      Delete
    </Button>
  );
};

export default Delete;

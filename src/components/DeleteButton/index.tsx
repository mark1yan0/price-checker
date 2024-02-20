'use client';

import { supabase } from '@/db/client';

const Delete = ({ id }: { id: number }) => {
  return (
    <button
      onClick={async () => {
        const res = await supabase.from('price_items').delete().eq('id', id); // TODO: see how to handle, as we tie together a client component and db mutation
        console.log('deleted', res);
      }}
    >
      Delete
    </button>
  );
};

export default Delete;

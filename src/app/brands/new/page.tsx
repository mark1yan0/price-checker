import { createItemAction } from '@/app/actions';
import Form from '@/components/Form';

const New = async () => {
  return (
    <div>
      <Form action={createItemAction} />
    </div>
  );
};

export default New;

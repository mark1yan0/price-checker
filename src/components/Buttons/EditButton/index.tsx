'use client';

import { useState } from 'react';
import Button from '..';
import { updateItemAction } from '@/app/actions';
import { IPriceItem } from '@/types/database';
import Form from '@/components/Form';
import Sidebar from '@/components/Sidebar';

const EditButton = ({ item }: { item: IPriceItem }) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button onClick={() => setOpened(!opened)} variant="neutral">
        Edit {opened ? item.id : null}
      </Button>

      <Sidebar opened={opened} onClose={() => setOpened(false)}>
        <UpdateItemForm item={item} />
      </Sidebar>
    </>
  );
};

export default EditButton;

const UpdateItemForm = ({ item }: { item: IPriceItem }) => {
  const updateItemActionWithId = updateItemAction.bind(null, item.id);
  return (
    <Form
      initialValues={{
        id: item.id,
        name: item.name,
        url: item.url,
        css_selector: item.css_selector,
        base_price: item.base_price,
      }}
      columns={1}
      action={updateItemActionWithId}
    />
  );
};

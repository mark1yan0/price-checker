'use client';

import Button from '@/components/Buttons';
import React from 'react';
import { useFormStatus } from 'react-dom';

// TODO: add dotted animation on loading
const SubmitButton = ({ text }: { text: string }) => {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending} variant="primary" type="submit">
      {status.pending ? 'loading...' : text}
    </Button>
  );
};

export default SubmitButton;

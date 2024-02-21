'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ text }: { text: string }) => {
  const status = useFormStatus();
  return (
    <button disabled={status.pending} type='submit'>
      {status.pending ? 'loading...' : text}
    </button>
  );
};

export default SubmitButton;

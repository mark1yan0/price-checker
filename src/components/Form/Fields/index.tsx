import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const Field = ({
  name,
  label,
  type,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string }) => {
  return (
    <label htmlFor={name} className='w-full'>
      {label}
      <input
        type={type ?? 'text'}
        name={name}
        className='block w-full rounded-sm p-2'
        {...props}
      />
    </label>
  );
};

export default Field;

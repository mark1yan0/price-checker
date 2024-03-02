import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const Field = ({
  name,
  label,
  type,
  variant = 'default',
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string; variant?: keyof typeof variants }) => {
  return (
    <label htmlFor={name} className="w-full">
      {label}
      <input
        type={type ?? 'text'}
        name={name}
        {...props}
        className={twMerge(variants[variant], props.className)}
      />
    </label>
  );
};

export default Field;

const variants: Record<'default' | 'title', string> = {
  title: 'block w-full bg-transparent text-2xl text-white outline-none',
  default:
    '-bg--color-surface-200 -outline--color-primary-300 block w-full rounded-sm p-2 text-white focus-within:outline focus-within:outline-offset-1',
};

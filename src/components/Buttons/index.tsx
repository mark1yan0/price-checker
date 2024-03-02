'use client';

import { bounceOnTapVariant } from '@/lib/animations';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  children,
  variant = 'primary',
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { variant?: keyof typeof variants; children: React.ReactNode }) => {
  return (
    <motion.button
      {...props}
      variants={bounceOnTapVariant}
      initial="initial"
      whileTap="animate"
      className={twMerge(
        'rounded border px-2 py-1 text-[0.8rem] sm:text-sm',
        variants[variant],
        props.className,
      )}
    >
      {children}
    </motion.button>
  );
};

export default Button;

const variants: Record<'primary' | 'danger' | 'neutral' | 'success', string> = {
  neutral:
    'border-gray-600 bg-gray-600/30 text-gray-600 hover:bg-gray-600 hover:text-white',
  primary:
    '-bg--color-primary-300/30 -border--color-primary-300 -text--color-primary-300 hover:-bg--color-primary-300/100 hover:text-white',
  danger: 'border-red-500 bg-red-500/30 hover:bg-red-500/100 hover:text-white',
  success:
    'border-green-500 bg-green-500/30 text-green-500 hover:bg-green-500/100 hover:text-white',
};

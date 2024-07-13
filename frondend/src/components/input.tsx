import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}
export function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
    />
  );
}

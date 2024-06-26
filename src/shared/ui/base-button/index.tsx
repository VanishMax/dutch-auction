import type { FC, ReactNode, HTMLAttributes } from 'react';
import { Spinner } from '../spinner';
import clsx from 'clsx';
import './styles.css';

export interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  children?: ReactNode;
  submit?: boolean;
}

export const BaseButton: FC<BaseButtonProps> = ({ children, className, loading, submit, ...attrs }) => {
  return (
    <button type={submit ? 'submit' : 'button'} disabled={loading} className={clsx('flex items-center justify-center font-bold h-[42px] py-[10px] px-[30px] select-none rounded-lg bg-button-gradient-secondary', className)} {...attrs}>
      {loading ? <Spinner /> : children}
    </button>
  );
};

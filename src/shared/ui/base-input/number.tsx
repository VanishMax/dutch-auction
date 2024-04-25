import type { FC } from 'react';
import { NumberField, type NumberFieldProps, Label, Input } from 'react-aria-components';
import clsx from 'clsx';

export interface NumberInputProps extends NumberFieldProps {
  label: string;
  error?: string;
}

export const NumberInput: FC<NumberInputProps> = ({ label, error, className, ...props }) => {
  return (
    <NumberField {...props} className={clsx(className, 'relative flex flex-col gap-1')}>
      <Label className="text-gray-200 text-sm">{label}</Label>
      <Input
        className={clsx(
          'rounded-lg px-4 font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal/80 h-9 w-full transition-all bg-black/50 text-muted-foreground',
          error && 'ring-amber-500 ring-2'
        )}
      />
      {error && <span className="absolute -bottom-6 text-sm text-amber-500">{error}</span>}
    </NumberField>
  );
};

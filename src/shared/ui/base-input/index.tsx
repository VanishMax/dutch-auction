import type { FC } from 'react';
import { TextField, type TextFieldProps, Label, Input} from 'react-aria-components';
import clsx from 'clsx';

export interface BaseInputProps extends TextFieldProps {
  label: string;
}

export const BaseInput: FC<BaseInputProps> = ({ label, className, ...props }) => {
  return (
    <TextField className={clsx(className, 'flex flex-col gap-1')} {...props}>
      <Label className="text-gray-200 text-sm">{label}</Label>
      <Input className="rounded-lg px-4 font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal/80 h-9 w-full transition-all bg-black/50 text-muted-foreground" />
    </TextField>
  );
};

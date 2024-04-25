import type { FC } from 'react';

import {Button, ComboBox as AriaCombobox, ComboBoxProps, Input, Label, ListBox, ListBoxItem, Popover} from 'react-aria-components';
import { assets } from 'chain-registry/mainnet/osmosis';
import clsx from 'clsx';

type Asset = typeof assets.assets[0];

export interface ComboboxProps extends ComboBoxProps<object> {
  label: string;
  onChange?: (asset: Asset) => void;
}

export const Combobox: FC<ComboboxProps> = ({ label, onChange, className, ...props }) => {
  const getLogo = (asset: Asset): string => {
    const logo = asset.logo_URIs;
    return logo?.svg || logo?.png || logo?.jpeg || '';
  };

  const onSelectionChange = (key: number | string) => {
    const token = assets.assets.find((asset) => asset.name === key);
    onChange?.(token as Asset);
  };

  return (
    <AriaCombobox className={clsx('flex flex-col gap-1', className)} {...props} onSelectionChange={onSelectionChange}>
      <Label className="text-gray-200 text-sm">{label}</Label>
      <div className="flex justify-between items-center rounded-lg px-4 font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal/80 h-9 w-full transition-all bg-black/50 text-muted-foreground">
        <Input className="flex-grow bg-transparent outline-0" />
        <Button>▼</Button>
      </div>

      <Popover>
        <ListBox className="bg-black/80 rounded-lg py-2 h-60 overflow-y-auto">
          {assets.assets.map((asset) => (
            <ListBoxItem key={asset.name + asset.symbol} className="flex items-center py-1 px-4 gap-4 hover:bg-black transition" id={asset.name} value={asset} textValue={asset.name}>
              <img src={getLogo(asset)} alt={asset.name} className="w-6 h-6 rounded-full bg-gray-400" />
              <span className="flex-grow">
                {asset.name}
              </span>
              <span className="text-gray-500 text-sm font-bold">
                {asset.symbol}
              </span>
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaCombobox>
  );
};

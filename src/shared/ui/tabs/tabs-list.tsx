import type { FC } from 'react';
import { TabList as AriaTabList, type TabListProps } from 'react-aria-components';
import clsx from 'clsx';


export const TabsList: FC<TabListProps<object>> = ({ className, ...props}) => {
  return (
    <AriaTabList
      {...props}
      className={clsx(className, 'inline-flex h-[52px] items-center justify-center rounded-lg bg-background px-2 mb-6 gap-3 w-full')}
    />
  );
};

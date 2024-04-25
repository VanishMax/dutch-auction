import type { FC } from 'react';
import { TabList as AriaTabList, type TabListProps } from 'react-aria-components';


export const TabsList: FC<TabListProps<object>> = (props) => {
  return (
    <AriaTabList
      {...props}
      className="inline-flex h-[52px] items-center justify-center rounded-lg bg-background px-2 mb-6 gap-3 w-full"
    />
  );
};

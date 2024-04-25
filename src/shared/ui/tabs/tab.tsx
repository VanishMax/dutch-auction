import type { FC } from 'react';
import { Tab as AriaTab, TabProps } from 'react-aria-components';
import './styles.css';

export const Tab: FC<TabProps> = (props) => {
  return (
    <AriaTab
      {...props}
      className="tab inline-flex items-center justify-center w-48 rounded-lg px-4 font-bold ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal/80 h-9 transition-all bg-transparent text-muted-foreground"
    />
  );
};

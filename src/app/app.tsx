import type { FC } from 'react';
import { LogoAnimation, Tabs, TabsList, Tab, TabPanel } from 'shared/ui';
import { UserConnect } from 'features/connect-user';

import './app.css';
import { MyAuctionsList } from 'widgets/my-auctions-list';
import { AuctionForm } from 'entities/auction';

export const App: FC = () => {
  return (
    <main className="h-dvh flex flex-col gap-8 w-3/4 mx-auto py-8">
      <header className="relative z-10 rounded-lg shadow-sm overflow-hidden flex justify-between items-center p-5">
        <h1 className="text-lg font-bold tracking-wide uppercase">Dutch auction</h1>
        <UserConnect />
      </header>

      <Tabs className="main-section relative z-10 w-full p-4 flex-grow rounded-lg bg-white/20 backdrop-blur-lg shadow-2xl shadow-amber-950 overflow-y-auto">
        <TabsList aria-label="Dutch auction" className="sticky top-0">
          <Tab id="my-auctions">My auctions</Tab>
          <Tab id="new-auction">New auction</Tab>
        </TabsList>
        <TabPanel id="my-auctions">
          <MyAuctionsList />
        </TabPanel>
        <TabPanel id="new-auction">
          <AuctionForm />
        </TabPanel>
      </Tabs>

      <div className="fixed inset-0 z-0 p-16">
        <LogoAnimation />
      </div>
    </main>
  );
};

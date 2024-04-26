import { FC, useState } from 'react';
import { LogoAnimation, Tabs, TabsList, Tab, TabPanel } from 'shared/ui';
import { UserConnect } from 'features/connect-user';

import './app.css';
import { MyAuctionsList } from 'widgets/my-auctions-list';
import { AuctionForm } from 'entities/auction';
import { useUserStore } from 'entities/user';

enum AppTabs {
  MyAuctions = 'my-auctions',
  NewAuction = 'new-auction',
}

export const App: FC = () => {
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState(AppTabs.MyAuctions);

  return (
    <main className="h-dvh flex flex-col gap-8 w-3/4 mx-auto py-8">
      <header className="relative z-10 rounded-lg shadow-sm overflow-hidden flex justify-between items-center p-5">
        <h1 className="text-lg font-bold tracking-wide uppercase">Dutch auction</h1>
        <UserConnect />
      </header>

      <Tabs
        selectedKey={activeTab}
        className="main-section relative z-10 w-full p-4 flex flex-col items-center flex-grow rounded-lg bg-white/20 backdrop-blur-lg shadow-2xl shadow-amber-950 overflow-y-auto"
        onSelectionChange={(tab) => setActiveTab(tab as AppTabs)}
      >
        {!!user && (
          <TabsList aria-label="Dutch auction" className="sticky top-0">
            <Tab id={AppTabs.MyAuctions}>My auctions</Tab>
            <Tab id={AppTabs.NewAuction}>New auction</Tab>
          </TabsList>
        )}
        <TabPanel id={AppTabs.MyAuctions} className="w-full">
          <MyAuctionsList />
        </TabPanel>
        <TabPanel id={AppTabs.NewAuction}>
          <AuctionForm onCreated={() => setActiveTab(AppTabs.MyAuctions)} />
        </TabPanel>
      </Tabs>

      <div className="fixed inset-0 z-0 p-16">
        <LogoAnimation />
      </div>
    </main>
  );
};

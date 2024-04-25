import type { FC } from 'react';
import { LogoAnimation } from 'shared/ui';
import { UserConnect } from 'features/connect-user';

import './app.css';

export const App: FC = () => {
  return (
    <main className="h-full flex flex-col gap-8 w-3/4 mx-auto py-8">
      <header className="relative z-10 rounded-lg shadow-sm overflow-hidden flex justify-between items-center p-5">
        <h1 className="text-lg font-bold tracking-wide uppercase">Dutch auction</h1>
        <UserConnect />
      </header>

      <section className="relative z-10 h-16 w-full rounded-lg bg-white/20 backdrop-blur-lg shadow-2xl shadow-amber-950">
        Lol
      </section>

      <div className="fixed inset-0 z-0 p-16">
        <LogoAnimation />
      </div>
    </main>
  );
};

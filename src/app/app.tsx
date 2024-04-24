import { AnimatedPenumbra } from 'shared/ui';
import { FC } from 'react';

import './app.css';

export const App: FC = () => {
  return (
    <main className="w-full h-full">
      <section className="relative z-10 w-3/4 mx-auto my-8 rounded-lg shadow-sm overflow-hidden bg-card-radial order-2 flex flex-1 flex-col p-5 md:p-4 lg:order-1 lg:col-span-2 lg:row-span-2 xl:p-5">
        <h1>Hi!</h1>
      </section>

      <div className="fixed inset-0 z-0">
        <AnimatedPenumbra />
      </div>
    </main>
  );
};

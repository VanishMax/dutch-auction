import type { FC } from 'react';

export const HelperInfo: FC = () => {
  return (
    <div className="flex flex-col gap-4 w-1/2 mx-auto mt-4">
      <h2 className="bg-text-linear bg-clip-text text-xl text-center font-semibold leading-[30px] text-transparent md:text-2xl md:font-bold md:leading-9">
        Welcome to the Dutch auction!
      </h2>
      <p>
        You can sell your tokens using the Dutch auction mechanism: the price starts high and decreases over time. You only need to define the starting and reserve price along with the amount of tokens you wish to sell. The app will create several sequential auctions for you, ensuring the best price.
      </p>
      <p>
        To start, please connect your <a href="https://penumbra.zone/" rel="nofollow noreferrer" target="_blank">Penumbra wallet</a>.
      </p>
    </div>
  );
};

import type { FC } from 'react';
import { type Auction, AuctionCard } from 'entities/auction';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const CardGroup: FC<{ auctions: Auction[], title: string, isActive?: boolean, isPassed?: boolean }> = ({ auctions, title, isPassed, isActive }) => {
  const [parent] = useAutoAnimate();

  if (!auctions.length) {
    return null;
  }

  return (
    <div ref={parent} className="flex flex-col gap-2">
      <h2 className="bg-text-linear bg-clip-text text-transparent text-xl font-semibold leading-[30px] md:text-2xl md:font-bold md:leading-9">
        {title}
      </h2>
      {auctions.map((auction) => (
        <AuctionCard
          auction={auction}
          key={auction.sellToken + auction.startTime.toString()}
          isActive={isActive}
          isPassed={isPassed}
        />
      ))}
    </div>
  );
};

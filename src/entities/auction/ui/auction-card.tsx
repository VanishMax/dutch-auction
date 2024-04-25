import type { FC } from 'react';
import type { Auction } from '../model';

export interface AuctionCardProps {
  auction: Auction;
}

export const AuctionCard: FC<AuctionCardProps> = ({ auction }) => {
  return (
    <div className="flex">
      <p className="font-bold">{auction.asset}</p>
    </div>
  );
};

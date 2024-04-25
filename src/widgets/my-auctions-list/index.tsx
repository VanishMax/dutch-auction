import { FC } from 'react';
import { AuctionCard, useAuctionStore } from 'entities/auction';

export const MyAuctionsList: FC = () => {
  const auctions = useAuctionStore((state) => state.myAuctions);

  return (
    <>
      {auctions.map((auction) => (
        <AuctionCard auction={auction} key={auction.asset} />
      ))}
    </>
  );
};

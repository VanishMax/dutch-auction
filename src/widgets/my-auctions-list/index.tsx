import { FC, useMemo } from 'react';
import { Auction, AuctionCard, useAuctionStore } from 'entities/auction';
import { HelperInfo } from 'widgets/helper-info';
import { useUserStore } from 'entities/user';
import { useTime } from 'shared/utils/use-time';

export const MyAuctionsList: FC = () => {
  const auctions = useAuctionStore((state) => state.myAuctions);
  const user = useUserStore((state) => state.user);

  const time = useTime();

  const { passed, current, queued } = useMemo(() => {
    return auctions.reduce((accum, currentValue) => {
      if (currentValue.endTime < time) {
        accum.passed.push(currentValue);
      } else if (currentValue.startTime < time && currentValue.endTime > time) {
        accum.current.push(currentValue);
      } else {
        accum.queued.push(currentValue);
      }
      return accum;
    }, {
      passed: [] as Auction[],
      current: [] as Auction[],
      queued: [] as Auction[],
    });
  }, [auctions]);

  if (!auctions.length || !user) {
    return <HelperInfo />;
  }

  return (
    <div className="flex flex-col gap-5">
      {!!current.length && (
        <div className="flex flex-col gap-2">
          <h2 className="bg-text-linear bg-clip-text text-xl font-semibold leading-[30px] text-transparent md:text-2xl md:font-bold md:leading-9">Current auctions</h2>
          {current.map((auction) => (
            <AuctionCard auction={auction} key={auction.sellToken + auction.startTime.toString()} isActive />
          ))}
        </div>
      )}
      {!!queued.length && (
        <div className="flex flex-col gap-2">
          <h2 className="bg-text-linear bg-clip-text text-transparent text-xl font-semibold leading-[30px] md:text-2xl md:font-bold md:leading-9">Queued auctions</h2>
          {queued.map((auction) => (
            <AuctionCard auction={auction} key={auction.sellToken + auction.startTime.toString()} />
          ))}
        </div>
      )}
      {!!passed.length && (
        <div className="flex flex-col gap-2">
          <h2 className="bg-text-linear bg-clip-text text-transparent text-xl font-semibold leading-[30px] md:text-2xl md:font-bold md:leading-9">Passed auctions</h2>
          {passed.map((auction) => (
            <AuctionCard auction={auction} key={auction.sellToken + auction.startTime.toString()}/>
          ))}
        </div>
      )}
    </div>
  );
};

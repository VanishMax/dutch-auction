import { FC, useMemo } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Auction, useAuctionStore } from 'entities/auction';
import { HelperInfo } from 'widgets/helper-info';
import { useUserStore } from 'entities/user';
import { useTime } from 'shared/utils/use-time';
import { CardGroup } from 'widgets/my-auctions-list/card-group.tsx';

export const MyAuctionsList: FC = () => {
  const auctions = useAuctionStore((state) => state.myAuctions);
  const user = useUserStore((state) => state.user);
  const [parent] = useAutoAnimate();

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
    <div ref={parent} className="flex flex-col gap-5">
      <CardGroup auctions={current} title="Current auctions" isActive />
      <CardGroup auctions={queued} title="Queued auctions" isActive />
      <CardGroup auctions={passed} title="Ended auctions" isPassed />
    </div>
  );
};

import type { FC } from 'react';
import { Auction, useAuctionStore } from '../model';
import clsx from 'clsx';
import { useTime } from 'shared/utils/use-time.ts';
import { BaseButton } from 'shared/ui';

export interface AuctionCardProps {
  auction: Auction;
  isActive?: boolean;
  isPassed?: boolean;
}

export const AuctionCard: FC<AuctionCardProps> = ({ auction, isActive, isPassed }) => {
  const cancelAuction = useAuctionStore((state) => state.cancelAuction);
  const time = useTime();

  const formatTime = (date: Date) => {
    const isToday = new Date().getDate() === date.getDate();
    if (isToday) return date.toLocaleTimeString();

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const timeDistance = (date: Date): string => {
    if (!isActive) return '';
    const seconds = Math.floor((date.getTime() - time.getTime()) / 1000);
    if (seconds < 60) {
      return ` (${seconds} seconds left)`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return ` (${minutes} minutes ${seconds % 60} seconds left)`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return ` (${hours} hours ${minutes % 60} minutes left)`;
    }

    return '';
  };

  const onCancel = () => {
    cancelAuction(auction.sellToken, auction.startTime);
  };

  return (
    <div className={clsx('flex gap-6 w-full bg-black/60 border border-gray-900 rounded p-2', isActive && 'shadow shadow-amber-700')}>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-gray-300">You sell</p>
        <p className="">{auction.amount.toString()} ${auction.sellToken}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-gray-300">Receive token</p>
        <p className="">{auction.receiveToken}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-gray-300">Starting price</p>
        <p className="">{auction.startingPrice.toString()} ${auction.receiveToken}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-gray-300">Reserve price</p>
        <p className="">{auction.reservePrice.toString()} ${auction.receiveToken}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-gray-300">Start time</p>
        <p className="">{formatTime(auction.startTime)}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-gray-300">End time</p>
        <p className="">{formatTime(auction.endTime)}{timeDistance(auction.endTime)}</p>
      </div>

      {!isPassed ? (
        <BaseButton className="ml-auto" onClick={onCancel}>
          Cancel
        </BaseButton>
      ) : (
        <BaseButton className="ml-auto" onClick={onCancel}>
          Claim
        </BaseButton>
      )}
    </div>
  );
};

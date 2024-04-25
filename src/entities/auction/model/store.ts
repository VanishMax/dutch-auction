import { createStore, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Auction } from './types';
import { sendMessage } from '../api';

interface AuctionStore {
  myAuctions: Auction[];
  createAuction: (auction?: Auction) => Promise<void>;
}

const auctionStore = createStore<AuctionStore>()(persist((set) => ({
  myAuctions: [],
  createAuction: async () => {
    await sendMessage();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  },
}), {
  name: 'dutch-auction-auction-store',
  partialize: (state) => ({ myAuctions: state.myAuctions }),
  storage: {
    ...createJSONStorage(() => localStorage)!,
    getItem: (name) => {
      let state: { state?: AuctionStore };
      try {
        state = JSON.parse(localStorage.getItem(name) || '') as { state: AuctionStore };
      } catch (_) {
        state = {};
      }

      return {
        version: 0,
        state: state.state?.myAuctions ? {
          myAuctions: state.state.myAuctions.map((auction: Auction) => ({
            ...auction,
            amount: BigInt(auction.amount),
            initialPrice: BigInt(auction.initialPrice),
            reservePrice: BigInt(auction.reservePrice),
          })),
        } : {},
      };
    },
  },
}));

export function useAuctionStore(): AuctionStore;
export function useAuctionStore<T>(selector: (state: AuctionStore) => T): T
export function useAuctionStore<T>(selector?: (state: AuctionStore) => T) {
  return useStore(auctionStore, selector!);
}

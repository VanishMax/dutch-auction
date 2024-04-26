import { DutchAuctionDescription } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/component/auction/v1alpha1/auction_pb';
import { AssetId, Value } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/asset/v1/asset_pb';
import { Amount } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/num/v1/num_pb';
import type { Auction } from '../model/types';

export interface SendMessageArgs {
  input?: Value;
  outputId?: AssetId;
  maxOutput?: Amount;
  minOutput?: Amount;
  startHeight: bigint;
  endHeight: bigint;
  stepCount: bigint;
  nonce: Uint8Array;
}

export const adaptAuctionToBuf = (auction: Auction): SendMessageArgs => {
  return {
    input: new Value({
      assetId: new AssetId({
        altBaseDenom: auction.sellToken,
      }),
      amount: new Amount({
        lo: BigInt(auction.amount),
        hi: BigInt(auction.amount),
      }),
    }),
    outputId: new AssetId({
      altBaseDenom: auction.receiveToken,
    }),
    maxOutput: new Amount({
      lo: BigInt(auction.startingPrice),
      hi: BigInt(auction.startingPrice),
    }),
    minOutput: new Amount({
      lo: BigInt(auction.reservePrice),
      hi: BigInt(auction.reservePrice),
    }),
    startHeight: BigInt(auction.startTime.getTime()),
    endHeight: BigInt(auction.endTime.getTime()),
    // New step each 3 minutes
    stepCount: BigInt((auction.endTime.getTime() - auction.startTime.getTime()) / (3 * 60 * 1000)),
    nonce: new Uint8Array(),
  };
};

export const sendMessage = async (auction: Auction) => {
  const submission = new DutchAuctionDescription(adaptAuctionToBuf(auction)).toJson();
  const fromStorage = DutchAuctionDescription.fromJson(submission);
  console.log('auc', fromStorage);
};

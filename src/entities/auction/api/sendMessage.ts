import { DutchAuctionDescription } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/component/auction/v1alpha1/auction_pb';

export const sendMessage = async () => {
  const submission = new DutchAuctionDescription({  }).toJson();
  console.log(submission);
  // const fromStorage = DutchAuctionDescription.fromJson(submission);
};

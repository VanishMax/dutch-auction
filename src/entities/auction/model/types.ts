export interface Auction {
  sellToken: string,
  receiveToken: string,
  amount: bigint;
  startingPrice: bigint;
  reservePrice: bigint;
  startTime: Date;
  endTime: Date;
}

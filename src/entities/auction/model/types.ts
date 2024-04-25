export interface Auction {
  amount: bigint;
  denomination: number;
  asset: string;
  initialPrice: bigint;
  reservePrice: bigint;
  period: number; // in minutes
}

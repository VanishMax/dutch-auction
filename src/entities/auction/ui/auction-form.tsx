import { FC, FormEventHandler, useState } from 'react';

import { BaseButton, NumberInput, Combobox, Slider, type Asset } from 'shared/ui';
import { useAuctionStore, Auction } from 'entities/auction';

import * as yup from 'yup';
import { ValidationError } from 'yup';

const validationSchema = yup.object({
  sellToken: yup.string().required(),
  receiveToken: yup.string().required().test('receive-token', 'Cannot be the same as the asset to sell', (value, context) => {
    return value !== context.parent.sellToken;
  }),
  amount: yup.number().positive().required(),
  startingPrice: yup.number().positive().required(),
  reservePrice: yup.number().positive().required().test('reserve-price', 'Cannot be more than starting price', (value, context) => {
    return value <= context.parent.startingPrice;
  }),
  auctionDuration: yup.number().required(),
  auctionsAmount: yup.number().required(),
});
type SchemaType = yup.InferType<typeof validationSchema>;

export const AuctionForm: FC<{ onCreated?: VoidFunction }> = ({ onCreated }) => {
  const createAuction = useAuctionStore((state) => state.createAuction);

  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState<SchemaType['amount']>(0);
  const [startingPrice, setStartingPrice] = useState<SchemaType['startingPrice']>(0);
  const [reservePrice, setReservePrice] = useState<SchemaType['reservePrice']>(0);
  const [auctionDuration, setAuctionDuration] = useState<SchemaType['auctionDuration']>(15);
  const [auctionsAmount, setAuctionsAmount] = useState<SchemaType['auctionsAmount']>(1);
  const [sellToken, setSellToken] = useState<Asset>();
  const [receiveToken, setReceiveToken] = useState<Asset>();

  const [errors, setErrors] = useState<Partial<Record<keyof SchemaType, string>>>({});

  const clearForm = () => {
    setAmount(0);
    setStartingPrice(0);
    setReservePrice(0);
    setAuctionDuration(15);
    setAuctionsAmount(1);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      setErrors({});

      const value: Partial<SchemaType> = {
        sellToken: sellToken?.symbol,
        receiveToken: receiveToken?.symbol,
        amount,
        startingPrice,
        reservePrice,
        auctionDuration,
        auctionsAmount,
      };

      setLoading(true);
      const res = await validationSchema.validate(value, { abortEarly: false });

      const newAuctions: Auction[] = Array.from({ length: auctionsAmount }, (_, index) => ({
        sellToken: res.sellToken,
        receiveToken: res.receiveToken,
        amount: BigInt(res.amount),
        startingPrice: BigInt(res.startingPrice),
        reservePrice: BigInt(res.reservePrice),
        startTime: new Date(Date.now() + res.auctionDuration * 60 * 1000 * index),
        endTime: new Date(Date.now() + res.auctionDuration * 60 * 1000 * (index + 1)),
      }));
      await createAuction(newAuctions);

      clearForm();
      setLoading(false);
      onCreated?.();
    } catch (error) {
      console.error('err', error);
      if (error instanceof ValidationError) {
        setErrors(error.inner.reduce((acc, err) => ({ ...acc, [err.path as string]: err.message }), {}));
      }
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-10" onSubmit={onSubmit}>
      <fieldset className="flex gap-4 items-center justify-between">
        <Combobox
          error={errors.sellToken}
          label="Asset to sell"
          className="flex-grow"
          onChange={setSellToken}
        />
        <Combobox
          error={errors.receiveToken}
          label="Asset to receive"
          className="flex-grow"
          onChange={setReceiveToken}
        />
      </fieldset>

      <fieldset className="flex gap-4 items-center justify-between">
        <NumberInput
          className="flex-grow"
          label="Amount"
          value={amount}
          error={errors.amount}
          onChange={setAmount}
        />
        <NumberInput
          className="flex-grow"
          label="Starting price"
          value={startingPrice}
          error={errors.startingPrice}
          onChange={setStartingPrice}
        />
        <NumberInput
          className="flex-grow"
          label="Reserve price"
          value={reservePrice}
          error={errors.reservePrice}
          onChange={setReservePrice}
        />
      </fieldset>

      <fieldset className="flex gap-4 items-center justify-center">
        <Slider
          className="w-80"
          label="Auction duration"
          isTime
          value={auctionDuration}
          minValue={15}
          maxValue={2880}
          step={15}
          onChange={(values) => setAuctionDuration(values as number)}
        />
        <Slider
          className="w-80"
          label="Amount of sequential auctions"
          value={auctionsAmount}
          minValue={1}
          maxValue={10}
          step={1}
          onChange={(values) => setAuctionsAmount(values as number)}
        />
      </fieldset>

      <BaseButton className="w-40 ml-auto" submit loading={loading}>Submit</BaseButton>
    </form>
);
};

import { FC, FormEventHandler, useState } from 'react';

import { BaseButton, Combobox } from 'shared/ui';
import { useAuctionStore } from 'entities/auction';

import * as yup from 'yup';
import { ValidationError } from 'yup';

const validationSchema = yup.object({
  denomination: yup.number().required().default(6),
  amount: yup.number().required(),
});
type SchemaType = yup.InferType<typeof validationSchema>;

export const AuctionForm: FC = () => {
  const createAuction = useAuctionStore((state) => state.createAuction);

  const [loading, setLoading] = useState(false);

  const [denomination, setDenomination] = useState<SchemaType['denomination']>(0);
  const [amount, setAmount] = useState<SchemaType['amount']>(0);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const value: Partial<SchemaType> = {
        amount,
        denomination,
      };
      const res = await validationSchema.validate(value, { abortEarly: false });
      console.log(res);

      setLoading(true);
      await createAuction();
      setLoading(false);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error.errors);
      }
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex gap-4 items-center justify-between">
        <Combobox label="Asset to sell" className="flex-grow" />
        <Combobox label="Asset to receive" className="flex-grow" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="denomination-input" className="text-gray-200 text-sm">Denomination</label>
        <input
          id="denomination-input"
          type="number"
          placeholder=""
          className="rounded-lg px-4 font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal/80 h-9 w-full transition-all bg-black/50 text-muted-foreground"
          value={denomination}
          onInput={(event) => setDenomination(parseInt(event.currentTarget.value))}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="amount-input" className="text-gray-200 text-sm">Amount</label>
        <input
          id="amount-input"
          type="number"
          placeholder="Amount"
          className="rounded-lg px-4 font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal/80 h-9 w-full transition-all bg-black/50 text-muted-foreground"
          value={amount}
          onInput={(event) => setAmount(parseInt(event.currentTarget.value))}
        />
      </div>

      <BaseButton submit loading={loading}>Submit</BaseButton>
    </form>
);
};

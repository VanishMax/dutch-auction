import { FC, FormEventHandler, useState } from 'react';

import { BaseButton } from 'shared/ui';
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
      <input
        type="number"
        placeholder="Denomination"
        value={denomination}
        onInput={(event) => setDenomination(parseInt(event.currentTarget.value))}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onInput={(event) => setAmount(parseInt(event.currentTarget.value))}
      />
      <BaseButton submit loading={loading}>Submit</BaseButton>
    </form>
  );
};

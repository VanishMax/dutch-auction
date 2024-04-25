import { FC } from 'react';
import { BaseButton } from 'shared/ui';
import { useUserStore, shortenAddress } from 'entities/user';

export const UserConnect: FC = () => {
  const { user, signIn, signOut, loading } = useUserStore();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {!loading && <span className="text-sm text-white">{shortenAddress(user.address)}</span>}
        <BaseButton loading={loading} onClick={signOut}>Disconnect</BaseButton>
      </div>
    );
  }

  return (
    <BaseButton loading={loading} onClick={signIn}>Connect Wallet</BaseButton>
  );
};

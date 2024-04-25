import type { User } from '../model/types';

const DEFAULT_USER: User = {
  address: '0x1234567890123456789012345678901234567890',
  balance: 1000000n,
};

// TODO: change to the real wallet connection
export const userSignIn = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DEFAULT_USER);
    }, 1000);
  });
};

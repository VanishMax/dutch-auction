import { createStore, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { userSignOut, userSignIn } from '../api';
import type { User } from './types';
import './bigint-polyfill';

interface UserStore {
  user: User | undefined;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const userStore = createStore<UserStore>()(persist((set) => ({
  user: undefined,
  loading: false,
  signIn: async () => {
    set({ loading: true });
    const user = await userSignIn();
    set({ user, loading: false });
  },
  signOut: async () => {
    set({ loading: true });
    await userSignOut();
    set({ user: undefined, loading: false });
  },
}), {
  name: 'dutch-auction-user-store',
  partialize: (state) => ({ user: state.user }),
  storage: {
    ...createJSONStorage(() => localStorage)!,
    getItem: (name) => {
      let state: { state?: UserStore };
      try {
        state = JSON.parse(localStorage.getItem(name) || '') as { state: UserStore };
      } catch (_) {
        state = {};
      }

      return {
        version: 0,
        state: state.state?.user ? {
          user: {
            ...state.state.user,
            balance: BigInt(state.state.user.balance),
          },
        } : {},
      };
    },
  },
}));

export function useUserStore(): UserStore;
export function useUserStore<T>(selector: (state: UserStore) => T): T
export function useUserStore<T>(selector?: (state: UserStore) => T) {
  return useStore(userStore, selector!);
}

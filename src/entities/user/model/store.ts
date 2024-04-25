import { createStore, useStore } from 'zustand';

import { userSignOut, userSignIn } from '../api';
import type { User } from './types';

interface UserStore {
  user: User | undefined;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const userStore = createStore<UserStore>()((set) => ({
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
}));

export function useUserStore(): UserStore;
export function useUserStore<T>(selector: (state: UserStore) => T): T
export function useUserStore<T>(selector?: (state: UserStore) => T) {
  return useStore(userStore, selector!);
}

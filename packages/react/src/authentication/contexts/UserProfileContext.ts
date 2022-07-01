import { createContext } from 'react';
import type { Error } from './UserProfileProvider';
import type { GetUserResponse } from '@farfetch/blackout-client';

export interface UserProfileContextProps {
  loadProfile: () => Promise<GetUserResponse> | null;
  isLoading: boolean;
  error: Error | null;
  userData: GetUserResponse | null;
}

export default createContext<UserProfileContextProps>(
  {} as UserProfileContextProps,
);

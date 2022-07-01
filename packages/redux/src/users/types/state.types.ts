import type {
  BlackoutError,
  UserAttributesResponse,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  Nullable,
  StateWithoutResult,
  StateWithResult,
} from '../../types';

export type UsersState = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: any;
  benefits: StateWithoutResult;
  preferences: StateWithoutResult;
  updatePreferences: StateWithoutResult;
  titles: StateWithoutResult;
  credit: StateWithoutResult;
  creditMovements: StateWithoutResult;
  contacts: StateWithoutResult;
  userAttributes: StateWithResult<UserAttributesResponse[] | null>;
}>;

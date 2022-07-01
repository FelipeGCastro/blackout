import type {
  BlackoutError,
  Prediction,
  PredictionDetails,
  UserAddress,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  Nullable,
  StateWithoutResult,
  StateWithResult,
  StateWithResultArray,
} from '../../types';

export type AddressState = CombinedState<{
  error: Record<UserAddress['id'], BlackoutError | null>;
  isLoading: Record<UserAddress['id'], boolean>;
}>;

export type AddressesState = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: string[] | null;
  predictions: StateWithResultArray<Prediction>;
  predictionDetails: StateWithResult<PredictionDetails>;
  addresses: StateWithoutResult;
  address: AddressState;
  addressSchema: StateWithoutResult;
  defaultAddressDetails: StateWithResult<UserAddress>;
}>;

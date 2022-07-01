import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  CountryAddressSchema,
  Prediction,
  PredictionDetails,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';

/**
 * Create Address Action.
 */
export type CreateAddressAction =
  | CreateAddressFailureAction
  | CreateAddressRequestAction
  | CreateAddressSuccessAction;

type CreateAddressPayload = NormalizedSchema<
  {
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  UserAddress['id']
>;
export interface CreateAddressFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_ADDRESS_FAILURE;
}

export interface CreateAddressRequestAction extends Action {
  type: typeof actionTypes.CREATE_ADDRESS_REQUEST;
}

export interface CreateAddressSuccessAction extends Action {
  payload: CreateAddressPayload;
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.CREATE_ADDRESS_SUCCESS;
}

/**
 * Fetch Addresses Action.
 */
export type FetchAddressesAction =
  | FetchAddressesFailureAction
  | FetchAddressesRequestAction
  | FetchAddressesSuccessAction;

type FetchAddressesPayload = NormalizedSchema<
  {
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  Array<UserAddress['id']>
>;
export interface FetchAddressesFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_ADDRESSES_FAILURE;
}

export interface FetchAddressesRequestAction extends Action {
  type: typeof actionTypes.FETCH_ADDRESSES_REQUEST;
}

export interface FetchAddressesSuccessAction extends Action {
  payload: FetchAddressesPayload;
  type: typeof actionTypes.FETCH_ADDRESSES_SUCCESS;
}

/**
 * Fetch Address Action.
 */
export type FetchAddressAction =
  | FetchAddressFailureAction
  | FetchAddressRequestAction
  | FetchAddressSuccessAction;

type FetchAddressPayload = NormalizedSchema<
  {
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  Array<UserAddress['id']>
>;
export interface FetchAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_ADDRESS_FAILURE;
}

export interface FetchAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.FETCH_ADDRESS_REQUEST;
}

export interface FetchAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: FetchAddressPayload;
  type: typeof actionTypes.FETCH_ADDRESS_SUCCESS;
}

/**
 * Fetch Country Address Schemas Action.
 */
export type FetchCountryAddressSchemasAction =
  | FetchCountryAddressSchemasFailureAction
  | FetchCountryAddressSchemasRequestAction
  | FetchCountryAddressSchemasSuccessAction;

export interface FetchCountryAddressSchemasFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_FAILURE;
}

export interface FetchCountryAddressSchemasRequestAction extends Action {
  meta: { isoCode: string };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_REQUEST;
}

export interface FetchCountryAddressSchemasSuccessAction extends Action {
  payload: {
    entities: {
      addressSchema: Record<string, CountryAddressSchema[]>;
    };
    result: string;
  };
  type: typeof actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_SUCCESS;
}

/**
 * Fetch Default Contact Address Action.
 */
export type FetchDefaultContactAddressAction =
  | FetchDefaultContactAddressFailureAction
  | FetchDefaultContactAddressRequestAction
  | FetchDefaultContactAddressSuccessAction;

export interface FetchDefaultContactAddressFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface FetchDefaultContactAddressRequestAction extends Action {
  type: typeof actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface FetchDefaultContactAddressSuccessAction extends Action {
  payload: UserAddress;
  type: typeof actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS;
}

/**
 * Fetch address prediction details Action.
 */
export type FetchPredictionDetailsAction =
  | FetchPredictionDetailsFailureAction
  | FetchPredictionDetailsRequestAction
  | FetchPredictionDetailsSuccessAction;

export interface FetchPredictionDetailsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PREDICTION_DETAILS_FAILURE;
}

export interface FetchPredictionDetailsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PREDICTION_DETAILS_REQUEST;
}

export interface FetchPredictionDetailsSuccessAction extends Action {
  payload: PredictionDetails;
  type: typeof actionTypes.FETCH_PREDICTION_DETAILS_SUCCESS;
}

/**
 * Fetch address prediction Action.
 */
export type FetchPredictionAction =
  | FetchPredictionFailureAction
  | FetchPredictionRequestAction
  | FetchPredictionSuccessAction;

export interface FetchPredictionFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PREDICTION_FAILURE;
}

export interface FetchPredictionRequestAction extends Action {
  type: typeof actionTypes.FETCH_PREDICTION_REQUEST;
}

export interface FetchPredictionSuccessAction extends Action {
  payload: Prediction[];
  type: typeof actionTypes.FETCH_PREDICTION_SUCCESS;
}

/**
 * Remove address Action.
 */
export type RemoveAddressAction =
  | RemoveAddressFailureAction
  | RemoveAddressRequestAction
  | RemoveAddressSuccessAction;

export interface RemoveAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_ADDRESS_FAILURE;
}

export interface RemoveAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.REMOVE_ADDRESS_REQUEST;
}

export interface RemoveAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.REMOVE_ADDRESS_SUCCESS;
}

/**
 * Remove default contact address Action.
 */
export type RemoveDefaultContactAddressAction =
  | RemoveDefaultContactAddressFailureAction
  | RemoveDefaultContactAddressRequestAction
  | RemoveDefaultContactAddressSuccessAction;

export interface RemoveDefaultContactAddressFailureAction extends Action {
  meta: { userId: User['id']; addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface RemoveDefaultContactAddressRequestAction extends Action {
  meta: { userId: User['id']; addressId: UserAddress['id'] };
  type: typeof actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface RemoveDefaultContactAddressSuccessAction extends Action {
  meta: { userId: User['id']; addressId: UserAddress['id'] };
  type: typeof actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS;
}

/**
 * Set default billing address Action.
 */
export type SetDefaultBillingAddressAction =
  | SetDefaultBillingAddressFailureAction
  | SetDefaultBillingAddressRequestAction
  | SetDefaultBillingAddressSuccessAction;

export interface SetDefaultBillingAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE;
}

export interface SetDefaultBillingAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST;
}

export interface SetDefaultBillingAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS;
}

/**
 * Set default contact address Action.
 */
export type SetDefaultContactAddressAction =
  | SetDefaultContactAddressFailureAction
  | SetDefaultContactAddressRequestAction
  | SetDefaultContactAddressSuccessAction;

export interface SetDefaultContactAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface SetDefaultContactAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface SetDefaultContactAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS;
}

/**
 * Set default shipping address Action.
 */
export type SetDefaultShippingAddressAction =
  | SetDefaultShippingAddressFailureAction
  | SetDefaultShippingAddressRequestAction
  | SetDefaultShippingAddressSuccessAction;

export interface SetDefaultShippingAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE;
}

export interface SetDefaultShippingAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST;
}

export interface SetDefaultShippingAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS;
}

/**
 * Update Address Action.
 */
export type UpdateAddressAction =
  | UpdateAddressFailureAction
  | UpdateAddressRequestAction
  | UpdateAddressSuccessAction;

type UpdateAddressPayload = NormalizedSchema<
  {
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  UserAddress['id']
>;
export interface UpdateAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_ADDRESS_FAILURE;
}

export interface UpdateAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.UPDATE_ADDRESS_REQUEST;
}

export interface UpdateAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: UpdateAddressPayload;
  type: typeof actionTypes.UPDATE_ADDRESS_SUCCESS;
}

/**
 * Reset Addresses Action.
 */
export type ResetAddressesAction = ResetAddressesSuccessAction;

export interface ResetAddressesSuccessAction extends Action {
  type: typeof actionTypes.RESET_ADDRESSES;
}

/**
 * Reset Predictions Action.
 */
export type ResetPredictionAction = ResetPredictionSuccessAction;

export interface ResetPredictionSuccessAction extends Action {
  type: typeof actionTypes.RESET_PREDICTION;
}

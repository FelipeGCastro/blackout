import {
  getAddresses as addressesGetter,
  getAddress as addressGetter,
  getAddressSchema as addressSchemaGetter,
  getError as errorGetter,
  getDefaultAddressDetails,
  getIsLoading,
  getPredictionDetails as predictionsDetailsGetter,
  getPredictions as predictionsGetter,
  getResult as Result,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors/entity';
import type { AddressEntity, AddressesEntity } from '../entities/types';
import type { AddressesState } from './types';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { StoreState } from '../types';

/**
 * Returns the result of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Array containing the loaded addresses id.
 */
export const getAddressesResult = (
  state: StoreState,
): AddressesState['result'] =>
  Result(state.addresses as NonNullable<AddressesState>);

/**
 * Returns the error of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Address information object.
 */
export const getAddressesError = (state: StoreState): AddressesState['error'] =>
  errorGetter(state.addresses as NonNullable<AddressesState>);

/**
 * Returns the loading status of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areAddressesLoading = (
  state: StoreState,
): AddressesState['isLoading'] =>
  getIsLoading(state.addresses as NonNullable<AddressesState>);

/**
 * Returns the addresses entity that contains all user addresses.
 *
 * @param state - Application state.
 *
 * @returns Object containing all the currently loaded addresses.
 */
export const getAddresses = (state: StoreState): AddressesEntity =>
  getEntities(state, 'addresses');

/**
 * Returns a specific address with the specified 'addressId'.
 *
 * @param state     - Application state.
 * @param addressId - Address id.
 *
 * @returns Address information object.
 */
export const getAddress = (
  state: StoreState,
  addressId: AddressEntity['id'],
): AddressEntity | undefined => getEntityById(state, 'addresses', addressId);

/**
 * Returns a list with all addresses schemas in the application state.
 *
 * @param state - Application state.
 *
 * @returns - Schemas with the correspondent Iso code.
 */
export const getSchemas = (state: StoreState) =>
  getEntities(state, 'addressSchema');

/**
 * Returns a specific schema with the specified 'Iso code'.
 *
 * @param state   - Application state.
 * @param isoCode - Iso code or CountryId (deprecated).
 *
 * @returns Schema information object.
 */
export const getAddressSchema = (state: StoreState, isoCode: string) =>
  getEntityById(state, 'addressSchema', isoCode);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getPredictions = (
  state: StoreState,
): AddressesState['predictions']['result'] =>
  predictionsGetter(state.addresses as NonNullable<AddressesState>).result;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getPredictionsError = (
  state: StoreState,
): AddressesState['predictions']['error'] =>
  predictionsGetter(state.addresses as NonNullable<AddressesState>).error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const arePredictionsLoading = (
  state: StoreState,
): AddressesState['predictions']['isLoading'] =>
  predictionsGetter(state.addresses as NonNullable<AddressesState>).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getPredictionDetails = (
  state: StoreState,
): AddressesState['predictionDetails']['result'] =>
  predictionsDetailsGetter(state.addresses as NonNullable<AddressesState>)
    .result;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getPredictionDetailsError = (
  state: StoreState,
): AddressesState['predictionDetails']['error'] =>
  predictionsDetailsGetter(state.addresses as NonNullable<AddressesState>)
    .error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const arePredictionDetailsLoading = (
  state: StoreState,
): AddressesState['predictionDetails']['isLoading'] =>
  predictionsDetailsGetter(state.addresses as NonNullable<AddressesState>)
    .isLoading;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressesListLoading = (
  state: StoreState,
): AddressesState['addresses']['isLoading'] =>
  addressesGetter(state.addresses as NonNullable<AddressesState>).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressesListError = (
  state: StoreState,
): AddressesState['addresses']['error'] =>
  addressesGetter(state.addresses as NonNullable<AddressesState>).error;

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Loader status.
 */
export const isAddressLoading = (
  state: StoreState,
  addressId: AddressEntity['id'],
): boolean | undefined =>
  addressGetter(state.addresses as NonNullable<AddressesState>).isLoading[
    addressId
  ];

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Error details.
 */
export const getAddressError = (
  state: StoreState,
  addressId: AddressEntity['id'],
): BlackoutError | null | undefined =>
  addressGetter(state.addresses as NonNullable<AddressesState>).error[
    addressId
  ];

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressSchemaLoading = (
  state: StoreState,
): AddressesState['addressSchema']['isLoading'] =>
  addressSchemaGetter(state.addresses as NonNullable<AddressesState>).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressSchemaError = (
  state: StoreState,
): AddressesState['addressSchema']['error'] =>
  addressSchemaGetter(state.addresses as NonNullable<AddressesState>).error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isDefaultAddressDetailsLoading = (
  state: StoreState,
): AddressesState['defaultAddressDetails']['isLoading'] =>
  getDefaultAddressDetails(state.addresses as NonNullable<AddressesState>)
    .isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getDefaultAddressDetailsError = (
  state: StoreState,
): AddressesState['defaultAddressDetails']['error'] =>
  getDefaultAddressDetails(state.addresses as NonNullable<AddressesState>)
    .error;

/**
 * @param state - Application state.
 *
 * @returns Address details result.
 */
export const getDefaultAddressDetailsResult = (
  state: StoreState,
): AddressesState['defaultAddressDetails']['result'] =>
  getDefaultAddressDetails(state.addresses as NonNullable<AddressesState>)
    .result;

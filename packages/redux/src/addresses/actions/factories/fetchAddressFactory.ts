import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserAddress,
  toBlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';
import type { Dispatch } from 'redux';
import type { FetchAddressAction } from '../../types';

/**
 * @param addressId - Identifier of the address.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Gets the details of the address with the specified 'addressId'.
 *
 * @param getUserAddress - Get user address client.
 *
 * @returns Thunk factory.
 */
const fetchAddressFactory =
  (getUserAddress: GetUserAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchAddressAction>): Promise<UserAddress> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.FETCH_ADDRESS_REQUEST,
      });
      const result = await getUserAddress({ id: addressId, userId }, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: actionTypes.FETCH_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default fetchAddressFactory;

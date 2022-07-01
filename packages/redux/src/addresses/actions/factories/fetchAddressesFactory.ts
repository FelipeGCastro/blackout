import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserAddresses,
  toBlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';
import type { Dispatch } from 'redux';
import type { FetchAddressesAction } from '../../types';

/**
 * @param userId - Identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for getting all the addresses of the current user.
 *
 * @param getUserAddresses - Get user addresses client.
 *
 * @returns Thunk factory.
 */
const fetchAddressesFactory =
  (getUserAddresses: GetUserAddresses) =>
  (userId: User['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchAddressesAction>): Promise<UserAddress[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ADDRESSES_REQUEST,
      });
      const result = await getUserAddresses({ userId }, config);

      dispatch({
        payload: normalize(result, [addressesSchema]),
        type: actionTypes.FETCH_ADDRESSES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ADDRESSES_FAILURE,
      });

      throw error;
    }
  };

export default fetchAddressesFactory;

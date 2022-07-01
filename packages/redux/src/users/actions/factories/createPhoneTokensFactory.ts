import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostPhoneTokens,
  PostPhoneTokensData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param data   - User to be registered.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a new guest user.
 *
 * @param postPhoneToken - Post guest user client.
 *
 * @returns Thunk factory.
 */

const createPhoneToken =
  (postPhoneToken: PostPhoneTokens) =>
  (data: PostPhoneTokensData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_PHONE_TOKEN_REQUEST,
      });

      const result = await postPhoneToken(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_PHONE_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_PHONE_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneToken;

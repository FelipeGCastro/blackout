import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUserAttributes,
  toBlackoutError,
  UserAttributesData,
  UserAttributesResponse,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param userId - User id.
 * @param data   - User attributes object.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an user attribute.
 *
 * @param postUserAttributes - Post user attribute client.
 *
 * @returns Thunk factory.
 */
const createUserAttributesFactory =
  (postUserAttributes: PostUserAttributes) =>
  (userId: number, data: UserAttributesData, config?: Config) =>
  async (dispatch: Dispatch): Promise<UserAttributesResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST,
      });

      const result = await postUserAttributes(userId, data, config);

      dispatch({
        type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };

export default createUserAttributesFactory;

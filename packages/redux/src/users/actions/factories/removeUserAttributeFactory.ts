import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteUserAttribute,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param userId      - User's id to be filtered for.
 * @param attributeId - The attribute id to be filtered for.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Deletes a specific user attribute.
 *
 * @param deleteUserAttribute - Delete a specific user attribute.
 *
 * @returns Thunk factory.
 */
const removeUserAttributeFactory =
  (deleteUserAttribute: DeleteUserAttribute) =>
  (userId: number, attributeId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST,
      });

      const result = await deleteUserAttribute(userId, attributeId, config);

      dispatch({
        type: actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };

export default removeUserAttributeFactory;

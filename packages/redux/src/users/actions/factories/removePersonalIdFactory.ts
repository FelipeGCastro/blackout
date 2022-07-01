import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteUserPersonalId,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param userId     - The user's id.
 * @param personalId - Personal identifier.
 * @param config     - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                     header is required.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Deletes a specific user attribute.
 *
 * @param deletePersonalId - Delete a specific personal id.
 *
 * @returns Thunk factory.
 */
const removePersonalIdFactory =
  (deletePersonalId: DeleteUserPersonalId) =>
  (userId: number, personalId: string, config: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_PERSONAL_ID_REQUEST,
      });

      const result = await deletePersonalId(userId, personalId, config);

      dispatch({
        type: actionTypes.REMOVE_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default removePersonalIdFactory;

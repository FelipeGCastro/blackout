import * as actionTypes from '../../actionTypes';
import {
  Config,
  PatchUserPersonalId,
  PatchUserPersonalIdData,
  PatchUserPersonalIdResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
/**
 * Updates a specific personal id.
 *
 * @param patchPersonalId - Update a specific personal id.
 *
 * @returns Thunk factory.
 */
const updatePersonalIdFactory =
  (patchPersonalId: PatchUserPersonalId) =>
  (
    userId: number,
    personalId: string,
    data: PatchUserPersonalIdData,
    config: Config,
  ) =>
  async (dispatch: Dispatch): Promise<PatchUserPersonalIdResponse> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_PERSONAL_ID_REQUEST,
      });

      const result = await patchPersonalId(userId, personalId, data, config);

      dispatch({
        type: actionTypes.UPDATE_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default updatePersonalIdFactory;

import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserCreditMovements,
  GetUserCreditMovementsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
/**
 * @param id     - User identifier.
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Create get user credit movements.
 *
 * @param getUserCreditMovements - Get user credit movements client.
 *
 * @returns Thunk factory.
 */
const fetchCreditMovementsFactory =
  (getUserCreditMovements: GetUserCreditMovements) =>
  (id: string, query: GetUserCreditMovementsQuery, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_REQUEST,
      });

      const result = await getUserCreditMovements(id, query, config);

      dispatch({
        payload: { creditMovements: result },
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchCreditMovementsFactory;

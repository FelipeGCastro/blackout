import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPredictionDetails,
  GetPredictionDetailsProps,
  GetPredictionDetailsQuery,
  PredictionDetails,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPredictionDetailsAction } from '../../types';

/**
 * @param props  - Object containing predictionId.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Load Address details based in the prediction id.
 *
 * @param getPredictionDetails - Get prediction details client.
 *
 * @returns Thunk factory.
 */
const fetchPredictionDetailsFactory =
  (getPredictionDetails: GetPredictionDetails) =>
  (
    props: GetPredictionDetailsProps,
    query: GetPredictionDetailsQuery,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchPredictionDetailsAction>,
  ): Promise<PredictionDetails> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PREDICTION_DETAILS_REQUEST,
      });

      const result = await getPredictionDetails(props, query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PREDICTION_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PREDICTION_DETAILS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPredictionDetailsFactory;

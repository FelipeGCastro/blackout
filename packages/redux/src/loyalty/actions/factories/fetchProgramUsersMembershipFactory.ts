import {
  FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE,
  FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST,
  FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import membershipSchema from '../../../entities/schemas/membership';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchProgramUsersMembershipAction } from '../../types';
import type {
  GetProgramUsersMembership,
  Program,
  ProgramMembership,
} from '@farfetch/blackout-client/loyalty/types';

/**
 * @param programId - Program identifier.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Load program membership statements.
 *
 * @param getProgramUsersMembership - Get program users membership client.
 *
 * @returns Thunk factory.
 */

const fetchProgramUsersMembershipFactory =
  (getProgramUsersMembership: GetProgramUsersMembership) =>
  (programId: Program['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchProgramUsersMembershipAction>,
  ): Promise<ProgramMembership> => {
    dispatch({
      type: FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST,
    });

    try {
      const result = await getProgramUsersMembership(programId, config);

      dispatch({
        payload: normalize(result, membershipSchema),
        type: FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE,
      });

      throw error;
    }
  };

export default fetchProgramUsersMembershipFactory;

import * as actionTypes from '../../actionTypes';
import {
  Config,
  CountryAddressSchema,
  GetCountryAddressSchemas,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchCountryAddressSchemasAction } from '../../types';

/**
 * @param isoCode - IsoCode.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the address schema for a country specified with 'id'.
 *
 * @param getCountryAddressSchemas - Get country address schemas client.
 *
 * @returns Thunk factory.
 */
const fetchCountryAddressSchemasFactory =
  (getCountryAddressSchemas: GetCountryAddressSchemas) =>
  (isoCode: string, config?: Config) =>
  async (
    dispatch: Dispatch<FetchCountryAddressSchemasAction>,
  ): Promise<CountryAddressSchema[]> => {
    try {
      dispatch({
        meta: { isoCode },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_REQUEST,
      });
      const result = await getCountryAddressSchemas(isoCode, config);

      const schemaEntity = {
        entities: {
          addressSchema: {
            [isoCode]: result,
          },
        },
        result: isoCode,
      };

      dispatch({
        payload: schemaEntity,
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryAddressSchemasFactory;

import { fetchCountryAddressSchemasFactory } from './factories';
import { getCountryAddressSchemas } from '@farfetch/blackout-client';

/**
 * Obtains the address schemas for a country specified with 'id'.
 */

export default fetchCountryAddressSchemasFactory(getCountryAddressSchemas);

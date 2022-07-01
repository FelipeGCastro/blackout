import { fetchAddressFactory } from './factories';
import { getUserAddress } from '@farfetch/blackout-client';

/**
 * Gets the details of the address with the specified 'addressId'.
 */

export default fetchAddressFactory(getUserAddress);

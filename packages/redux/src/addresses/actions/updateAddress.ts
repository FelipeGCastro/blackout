import { putUserAddress } from '@farfetch/blackout-client';
import { updateAddressFactory } from './factories';

/**
 * Updates the address information with the specified 'addressId'.
 */

export default updateAddressFactory(putUserAddress);

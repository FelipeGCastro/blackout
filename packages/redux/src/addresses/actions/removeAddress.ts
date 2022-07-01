import { deleteUserAddress } from '@farfetch/blackout-client';
import { removeAddressFactory } from './factories';

/**
 * Responsible for removing the address with the specified 'addressId'.
 */

export default removeAddressFactory(deleteUserAddress);

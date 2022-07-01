import { fetchAddressesFactory } from './factories';
import { getUserAddresses } from '@farfetch/blackout-client';

/**
 * Responsible for getting all the addresses of the current user.
 */
export default fetchAddressesFactory(getUserAddresses);

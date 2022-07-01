import { putUserDefaultContactAddress } from '@farfetch/blackout-client';
import { setDefaultContactAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default contact address.
 */

export default setDefaultContactAddressFactory(putUserDefaultContactAddress);

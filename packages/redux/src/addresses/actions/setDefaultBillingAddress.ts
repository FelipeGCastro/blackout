import { putUserDefaultBillingAddress } from '@farfetch/blackout-client';
import { setDefaultBillingAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default billing address.
 */

export default setDefaultBillingAddressFactory(putUserDefaultBillingAddress);

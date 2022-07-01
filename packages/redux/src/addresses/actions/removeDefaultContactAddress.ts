import { deleteUserDefaultContactAddress } from '@farfetch/blackout-client';
import { removeDefaultContactAddressFactory } from './factories';

/**
 * Responsible for deleting the users default contact address.
 */

export default removeDefaultContactAddressFactory(
  deleteUserDefaultContactAddress,
);

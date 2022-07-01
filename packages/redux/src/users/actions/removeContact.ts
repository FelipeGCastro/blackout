import { deleteUserContact } from '@farfetch/blackout-client';
import { removeContactFactory } from './factories';

/**
 * Remove a user contact.
 */
export default removeContactFactory(deleteUserContact);

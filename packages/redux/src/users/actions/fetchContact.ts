import { fetchContactFactory } from './factories';
import { getUserContact } from '@farfetch/blackout-client';

/**
 * Fetch contact from user.
 */
export default fetchContactFactory(getUserContact);

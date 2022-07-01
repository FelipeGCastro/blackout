import { fetchContactsFactory } from './factories';
import { getUserContacts } from '@farfetch/blackout-client';

/**
 * Fetch all the contacts from user.
 */
export default fetchContactsFactory(getUserContacts);

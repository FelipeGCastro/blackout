import { createContactFactory } from './factories';
import { postUserContact } from '@farfetch/blackout-client';

/**
 * Creates a user contact.
 */
export default createContactFactory(postUserContact);

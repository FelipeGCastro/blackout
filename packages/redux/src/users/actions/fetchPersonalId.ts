import { fetchPersonalIdFactory } from './factories';
import { getUserPersonalId } from '@farfetch/blackout-client';

/**
 * Fetch a specific personal id.
 */
export default fetchPersonalIdFactory(getUserPersonalId);

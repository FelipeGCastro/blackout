import { fetchPersonalIdsFactory } from './factories';
import { getUserPersonalIds } from '@farfetch/blackout-client';

/**
 * Fetch all personal ids.
 */
export default fetchPersonalIdsFactory(getUserPersonalIds);

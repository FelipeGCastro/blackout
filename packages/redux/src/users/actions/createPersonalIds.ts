import { createPersonalIdsFactory } from './factories';
import { postUserPersonalIds } from '@farfetch/blackout-client';

/**
 * Create personal ids.
 */
export default createPersonalIdsFactory(postUserPersonalIds);

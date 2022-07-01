import { patchUserPersonalId } from '@farfetch/blackout-client';
import { updatePersonalIdFactory } from './factories';

/**
 * Updates a specific personal id.
 */
export default updatePersonalIdFactory(patchUserPersonalId);

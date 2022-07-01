import { putUserDefaultPersonalId } from '@farfetch/blackout-client';
import { setDefaultPersonalIdFactory } from './factories';

/**
 * Updates the default personal id.
 */
export default setDefaultPersonalIdFactory(putUserDefaultPersonalId);

import { createUserAttributesFactory } from './factories';
import { postUserAttributes } from '@farfetch/blackout-client';

/**
 * Create user attributes for user with given id.
 */
export default createUserAttributesFactory(postUserAttributes);

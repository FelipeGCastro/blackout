import { patchUserAttribute } from '@farfetch/blackout-client/users';
import { updateUserAttributeFactory } from './factories';

/**
 * Updates a user attribute with given id.
 */
export default updateUserAttributeFactory(patchUserAttribute);

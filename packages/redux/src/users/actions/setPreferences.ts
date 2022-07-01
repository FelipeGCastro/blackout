import { putUserPreferences } from '@farfetch/blackout-client';
import { setPreferencesFactory } from './factories';

/**
 * Updates the user preferences.
 */
export default setPreferencesFactory(putUserPreferences);

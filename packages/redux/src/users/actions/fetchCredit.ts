import { fetchCreditFactory } from './factories';
import { getUserCredit } from '@farfetch/blackout-client';

/**
 * Fetch user credit balance.
 */
export default fetchCreditFactory(getUserCredit);

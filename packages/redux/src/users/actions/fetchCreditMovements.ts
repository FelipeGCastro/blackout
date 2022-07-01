import { fetchCreditMovementsFactory } from './factories';
import { getUserCreditMovements } from '@farfetch/blackout-client';

/**
 * Fetch user credit movements.
 */
export default fetchCreditMovementsFactory(getUserCreditMovements);

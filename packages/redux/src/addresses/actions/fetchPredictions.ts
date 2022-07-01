import { fetchPredictionsFactory } from './factories';
import { getPredictions } from '@farfetch/blackout-client';

/**
 * Load Predictions based in the inserted text.
 */

export default fetchPredictionsFactory(getPredictions);

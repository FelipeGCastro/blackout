import { fetchPredictionDetailsFactory } from './factories';
import { getPredictionDetails } from '@farfetch/blackout-client';

/**
 * Load Address details based in the prediction id.
 */

export default fetchPredictionDetailsFactory(getPredictionDetails);

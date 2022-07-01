import { fetchTitlesFactory } from './factories';
import { getTitles } from '@farfetch/blackout-client';

/**
 * Fetch a list of titles.
 */
export default fetchTitlesFactory(getTitles);

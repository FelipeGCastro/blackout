import type { Config } from '../../../types';
import type { UserPreference } from './userPreferences.types';

export type GetUserPreferences = (
  id: number,
  code?: string,
  config?: Config,
) => Promise<UserPreference[]>;

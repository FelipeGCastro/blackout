import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types';

export type PutUserPreferencesData = {
  code: string;
  values: string[];
  groupId: string;
  updatedDate: string;
}[];

export type PutUserPreferences = (
  userId: number,
  data: PutUserPreferencesData,
  config?: Config,
) => Promise<AxiosResponse<void>>;

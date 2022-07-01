import type { Config } from '../../../types';
import type { GetTitlesQuery } from '../../types/query.types';

export type Titles = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Title[];
};

export type Title = {
  id: string;
  value: string;
};

export type GetTitles = (
  query?: GetTitlesQuery,
  config?: Config,
) => Promise<Titles>;

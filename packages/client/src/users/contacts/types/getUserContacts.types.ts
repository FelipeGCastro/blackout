import type { Config } from '../../../types';
import type { UserContact } from '.';

export type GetUserContacts = (
  userId: number,
  config?: Config,
) => Promise<UserContact[]>;

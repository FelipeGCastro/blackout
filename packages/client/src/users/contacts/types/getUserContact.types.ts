import type { Config } from '../../../types';
import type { UserContact } from '.';

export type GetUserContact = (
  userId: number,
  contactId: string,
  config?: Config,
) => Promise<UserContact>;

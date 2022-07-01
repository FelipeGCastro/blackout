import type { Config } from '../../../types';
import type { UserContact, UserContactRequest } from './userContact.types';

export type PostUserContact = (
  userId: number,
  data: UserContactRequest,
  config?: Config,
) => Promise<UserContact>;

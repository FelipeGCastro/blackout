import type { AxiosResponse } from 'axios';
import type { Config } from '../../../types';
import type { UserContact } from './userContact.types';

export type DeleteUserContact = (
  userId: number,
  contactId: UserContact['id'],
  config?: Config,
) => Promise<AxiosResponse<void>>;

import type { Config, UserAddress } from '../../../types';
import type { User } from '.';

export type GetUserDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => Promise<UserAddress>;

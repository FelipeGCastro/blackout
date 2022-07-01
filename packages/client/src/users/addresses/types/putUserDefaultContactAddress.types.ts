import type { Config, UserAddress } from '../../../types';
import type { User } from '.';

export type PutUserDefaultContactAddress = (
  userId: User['id'],
  addressId: UserAddress['id'],
  config?: Config,
) => void;

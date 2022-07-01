import type { Config } from '../../../types';

export type UserCredit = {
  currency: string;
  value: number;
  formattedValue: string;
};

export type GetUserCredit = (
  id: string,
  config?: Config,
) => Promise<UserCredit[]>;

import type { Config } from '../../../types';
import type { GetUserCreditMovementsQuery } from '../../types/query.types';

export type UserCreditMovement = {
  type: number;
  value: number;
  formattedValue: string;
  currency: string;
  description: string;
  createdOn: string;
};

export type UserCreditMovements = {
  entries: UserCreditMovement[];
  number: number;
  totalItems: number;
  totalPages: number;
};

export type GetUserCreditMovements = (
  id: string,
  query: GetUserCreditMovementsQuery,
  config?: Config,
) => Promise<UserCreditMovements>;

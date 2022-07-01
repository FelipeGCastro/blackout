import type { Country } from 'packages/client/src';

export type ReturnOptionsEntity = {
  id: string;
  type: number;
  allowedCountries: Country[];
  isNumberOfBoxesMandatory: boolean;
  isMerchantLocationMandatory: boolean;
  isAddressMandatory: boolean;
  isSchedulePickup: boolean;
  merchantOrderId: number;
  merchant: number;
};

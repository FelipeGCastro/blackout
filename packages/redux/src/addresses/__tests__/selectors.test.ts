import * as fromAddresses from '../reducer';
import * as fromEntities from '../../entities/selectors/entity';
import * as selectors from '../selectors';
import {
  addressId2,
  isoCode as countryId,
  expectedGetAddressesNormalizedPayload,
  expectedGetAddressSchemaNormalizedPayload,
  mockCurrentState as mockState,
} from 'tests/__fixtures__/addresses';

describe('addresses redux selectors', () => {
  const addressSchemaEntity = {
    ...expectedGetAddressSchemaNormalizedPayload['entities'].addressSchema[
      countryId
    ],
  };

  beforeEach(jest.clearAllMocks);

  describe('getAddressesResult()', () => {
    it('should get the result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getResult');
      expect(selectors.getAddressesResult(mockState)).toEqual(
        mockState.addresses.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getAddressesError()', () => {
    it('should get the error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getError');

      expect(selectors.getAddressesError(mockState)).toEqual(
        mockState.addresses.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('areAddressesLoading()', () => {
    it('should get the addresses loading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getIsLoading');

      expect(selectors.areAddressesLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getAddresses()', () => {
    it('should get the addresses from state', () => {
      const expectedResult = mockState.entities.addresses;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getAddresses(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'addresses');
    });

    it('should get the addresses error property from state', () => {
      const expectedResult = mockState.addresses.addresses.error;
      const spy = jest.spyOn(fromAddresses, 'getAddresses');

      expect(selectors.getAddressesListError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the addresses isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddresses');

      expect(selectors.isAddressesListLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAddress()', () => {
    it('should get the specified address from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getAddress(mockState, addressId2)).toEqual(
        expectedGetAddressesNormalizedPayload.entities.addresses[addressId2],
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'addresses', addressId2);
    });

    it('should get the address isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddress');

      expect(selectors.isAddressLoading(mockState, addressId2)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the address error property from state', () => {
      const expectedResult = mockState.addresses.address.error[addressId2];
      const spy = jest.spyOn(fromAddresses, 'getAddress');

      expect(selectors.getAddressError(mockState, addressId2)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSchema()', () => {
    it('should get the address schemas list', () => {
      const expectedResult = mockState.entities.addressSchema;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getSchemas(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'addressSchema');
    });

    it('should get the schema for a specific country from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getAddressSchema(mockState, countryId)).toEqual(
        addressSchemaEntity,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'addressSchema', countryId);
    });
    it('should get the address schema isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressSchema');

      expect(selectors.isAddressSchemaLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the address schema error property from state', () => {
      const expectedResult = mockState.addresses.addressSchema.error;
      const spy = jest.spyOn(fromAddresses, 'getAddressSchema');

      expect(selectors.getAddressSchemaError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPredictions()', () => {
    it('should get the predictions result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictions');

      expect(selectors.getPredictions(mockState)).toEqual(
        mockState.addresses.predictions.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the predictions error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictions');

      expect(selectors.getPredictionsError(mockState)).toEqual(
        mockState.addresses.predictions.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the predictions isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictions');

      expect(selectors.arePredictionsLoading(mockState)).toEqual(
        mockState.addresses.predictions.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getPredictionDetails()', () => {
    it('should get the address result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictionDetails');

      expect(selectors.getPredictionDetails(mockState)).toEqual(
        mockState.addresses.predictionDetails.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the address error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictionDetails');

      expect(selectors.getPredictionDetailsError(mockState)).toEqual(
        mockState.addresses.predictionDetails.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the address isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictionDetails');

      expect(selectors.arePredictionDetailsLoading(mockState)).toEqual(
        mockState.addresses.predictionDetails.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getDefaultAddressDetails()', () => {
    it('should get the default address details isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getDefaultAddressDetails');

      expect(selectors.isDefaultAddressDetailsLoading(mockState)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details error property from state', () => {
      const expectedResult = mockState.addresses.defaultAddressDetails.error;
      const spy = jest.spyOn(fromAddresses, 'getDefaultAddressDetails');

      expect(selectors.getDefaultAddressDetailsError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details result property', () => {
      const spy = jest.spyOn(fromAddresses, 'getDefaultAddressDetails');
      const expectedResult = mockState.addresses.defaultAddressDetails.result;

      expect(selectors.getDefaultAddressDetailsResult(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

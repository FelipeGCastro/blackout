import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  addressId2,
  expectedUpdateAddressNormalizedPayload,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putUserAddress } from '@farfetch/blackout-client';
import { updateAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('updateAddress() action creator', () => {
  const data = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the update address procedure fails', async () => {
    const expectedError = new Error('update address error');

    putUserAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateAddress(userId, addressId2, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putUserAddress).toHaveBeenCalledTimes(1);
      expect(putUserAddress).toHaveBeenCalledWith(
        { userId, id: addressId2 },
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.UPDATE_ADDRESS_REQUEST,
          },
          {
            meta: { addressId: addressId2 },
            type: actionTypes.UPDATE_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update address procedure is successful', async () => {
    putUserAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(updateAddress(userId, addressId2, data));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(putUserAddress).toHaveBeenCalledTimes(1);
    expect(putUserAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.UPDATE_ADDRESS_SUCCESS,
        payload: expectedUpdateAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('update user address success payload');
  });
});

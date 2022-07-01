import * as actionTypes from '../../actionTypes';
import { fetchDefaultContactAddress } from '..';
import { getUserDefaultContactAddress } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockGetAddressResponse } from 'tests/__fixtures__/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchDefaultContactAddress() action creator', () => {
  const userId = '121212';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get default contact address details procedure fails', async () => {
    const expectedError = new Error('get default contact address error');

    getUserDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchDefaultContactAddress(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserDefaultContactAddress).toHaveBeenCalledTimes(1);
      expect(getUserDefaultContactAddress).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    const expectedResponse = { ...mockGetAddressResponse };

    getUserDefaultContactAddress.mockResolvedValueOnce(mockGetAddressResponse);
    await store.dispatch(fetchDefaultContactAddress(userId));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(getUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
        payload: expectedResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get user default contact address success payload');
  });
});

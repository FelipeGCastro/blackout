import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { createAddress } from '..';
import {
  expectedPostAddressNormalizedPayload,
  mockPostAddressResponse,
  userId,
} from 'tests/__fixtures__/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postUserAddress } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('createAddress() action creator', () => {
  const data = {
    addressLine1: 'etc',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the create address procedure fails', async () => {
    const expectedError = new Error('create address error');

    postUserAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createAddress(userId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postUserAddress).toHaveBeenCalledTimes(1);
      expect(postUserAddress).toHaveBeenCalledWith(
        { userId },
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.CREATE_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.CREATE_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create address procedure is successful', async () => {
    postUserAddress.mockResolvedValueOnce(mockPostAddressResponse);
    const result = await store.dispatch(createAddress(userId, data));
    const actionResults = store.getActions();

    expect.assertions(6);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postUserAddress).toHaveBeenCalledTimes(1);
    expect(postUserAddress).toHaveBeenCalledWith(
      { userId },
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.CREATE_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
        payload: expectedPostAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('create address success payload');
    expect(result).toEqual(mockPostAddressResponse);
  });
});

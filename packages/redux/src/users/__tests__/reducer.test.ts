import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import { address1 } from 'tests/__fixtures__/users';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import reducer, { entitiesMapper } from '../reducer';
import type { UsersState } from '../types';

let initialState: UsersState;
const randomAction = { type: 'this_is_a_random_action' };

describe('users redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('LOGOUT_SUCCESS should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    // Error status on FAILURE
    it.each([
      actionTypes.FETCH_USER_FAILURE,
      actionTypes.UPDATE_USER_FAILURE,
      actionTypes.CREATE_GUEST_USER_FAILURE,
      actionTypes.FETCH_GUEST_USER_FAILURE,
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOGOUT_FAILURE,
      actionTypes.REGISTER_FAILURE,
      actionTypes.PASSWORD_CHANGE_FAILURE,
      actionTypes.PASSWORD_RECOVER_FAILURE,
      actionTypes.PASSWORD_RESET_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
      });

      expect(reducerResult.error).toBe(error);
    });

    // Error status on REQUEST
    it.each([
      actionTypes.FETCH_USER_REQUEST,
      actionTypes.UPDATE_USER_REQUEST,
      actionTypes.CREATE_GUEST_USER_REQUEST,
      actionTypes.FETCH_GUEST_USER_REQUEST,
      actionTypes.RESET_USER_STATE,
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGOUT_REQUEST,
      actionTypes.PASSWORD_CHANGE_REQUEST,
      actionTypes.PASSWORD_RECOVER_REQUEST,
      actionTypes.PASSWORD_RESET_REQUEST,
      actionTypes.REGISTER_REQUEST,
    ])('should handle %s action type', actionType => {
      const reducerResult = reducer(undefined, {
        type: actionType,
      });

      expect(reducerResult.error).toBe(initialState.error);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).id;

      expect(state).toBe(initialState.id);
    });

    it('should handle FETCH_USER_SUCCESS action type', () => {
      const expectedResult = 123;

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_USER_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_USER_SUCCESS action type', () => {
      const expectedResult = 123;

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.UPDATE_USER_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_GUEST_USER_SUCCESS action type', () => {
      const expectedResult = 123;

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.CREATE_GUEST_USER_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_GUEST_USER_SUCCESS action type', () => {
      const expectedResult = 123;

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_GUEST_USER_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, id: 'foo' };

      expect(reducer(state, randomAction).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    // Loading status on REQUEST
    it.each([
      actionTypes.FETCH_USER_REQUEST,
      actionTypes.UPDATE_USER_REQUEST,
      actionTypes.CREATE_GUEST_USER_REQUEST,
      actionTypes.FETCH_GUEST_USER_REQUEST,
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGOUT_REQUEST,
      actionTypes.REGISTER_REQUEST,
      actionTypes.PASSWORD_CHANGE_REQUEST,
      actionTypes.PASSWORD_RECOVER_REQUEST,
      actionTypes.PASSWORD_RESET_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    // Loading status on SUCCESS
    it.each([
      actionTypes.FETCH_USER_SUCCESS,
      actionTypes.UPDATE_USER_SUCCESS,
      actionTypes.CREATE_GUEST_USER_SUCCESS,
      actionTypes.FETCH_GUEST_USER_SUCCESS,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.REGISTER_SUCCESS,
      actionTypes.PASSWORD_CHANGE_SUCCESS,
      actionTypes.PASSWORD_RECOVER_SUCCESS,
      actionTypes.PASSWORD_RESET_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: 'foo' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    // Loading status on FAILURE
    it.each([
      actionTypes.FETCH_USER_FAILURE,
      actionTypes.UPDATE_USER_FAILURE,
      actionTypes.CREATE_GUEST_USER_FAILURE,
      actionTypes.FETCH_GUEST_USER_FAILURE,
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOGOUT_FAILURE,
      actionTypes.REGISTER_FAILURE,
      actionTypes.PASSWORD_CHANGE_FAILURE,
      actionTypes.PASSWORD_RECOVER_FAILURE,
      actionTypes.PASSWORD_RESET_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: 'dummy_error' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: true };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    const state = {
      test: 'test',
      user: {
        id: 1213123,
        name: 'teste',
      },
    };

    describe('benefits', () => {
      it('should handle FETCH_USER_BENEFITS_SUCCESS action type', () => {
        const idBenefit1 = 1111;
        const benefitsEntity = {
          [idBenefit1]: {
            id: idBenefit1,
            code: 'SummerParty2017',
            isActive: true,
            metadata: {
              'dress-code': 'green',
            },
            benefitType: 'price',
          },
        };

        const expectedResult = {
          ...state,
          user: { ...state.user, benefits: [idBenefit1] },
          benefits: { ...benefitsEntity },
        };

        expect(
          entitiesMapper[actionTypes.FETCH_USER_BENEFITS_SUCCESS](state, {
            payload: {
              result: [idBenefit1],
              entities: {
                benefits: { ...benefitsEntity },
              },
            },
            type: actionTypes.FETCH_USER_BENEFITS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('preferences', () => {
      describe('FETCH_USER_PREFERENCES_SUCCESS', () => {
        it('should handle FETCH_USER_PREFERENCES_SUCCESS action type when _NO_ preferences are available on the server', () => {
          const expectedResult = {
            ...state,
            user: { ...state.user, preferences: [] },
            preferences: {},
          };

          expect(
            entitiesMapper[actionTypes.FETCH_USER_PREFERENCES_SUCCESS](state, {
              payload: {
                result: [],
                entities: {},
              },
              type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
            }),
          ).toEqual(expectedResult);
        });

        it('should handle FETCH_USER_PREFERENCES_SUCCESS action type when preferences are available on the server', () => {
          const codePreference = 'code1';
          const preferencesEntity = {
            [codePreference]: {
              code: codePreference,
              values: ['136968', '136831', '136908'],
              groupId: 'mobile',
              updatedDate: '2019-08-19T10:46:59.543Z',
            },
          };

          const expectedResult = {
            ...state,
            user: { ...state.user, preferences: [codePreference] },
            preferences: { ...preferencesEntity },
          };

          expect(
            entitiesMapper[actionTypes.FETCH_USER_PREFERENCES_SUCCESS](state, {
              payload: {
                result: [codePreference],
                entities: {
                  preferences: { ...preferencesEntity },
                },
              },
              type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
            }),
          ).toEqual(expectedResult);
        });
      });

      it('should handle UPDATE_USER_PREFERENCES_SUCCESS action type', () => {
        const codePreference = 'code1Updated';
        const preferencesEntity = {
          [codePreference]: {
            code: codePreference,
            values: ['136968', '136831', '136908'],
            groupId: 'mobile',
            updatedDate: '2019-08-19T10:46:59.543Z',
          },
        };

        const expectedResult = {
          ...state,
          user: { ...state.user, preferences: [codePreference] },
          preferences: { ...preferencesEntity },
        };

        expect(
          entitiesMapper[actionTypes.UPDATE_USER_PREFERENCES_SUCCESS](state, {
            payload: {
              result: [codePreference],
              entities: {
                preferences: { ...preferencesEntity },
              },
            },
            type: actionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('credits and credit movements', () => {
      it('should handle FETCH_USER_CREDIT_SUCCESS action type', () => {
        const credit = {
          currency: 'GB',
          value: 50,
          formattedValue: '£50',
        };

        const expectedResult = {
          ...state,
          user: { ...state.user, credit },
        };

        expect(
          entitiesMapper[actionTypes.FETCH_USER_CREDIT_SUCCESS](state, {
            payload: {
              credit,
            },
            type: actionTypes.FETCH_USER_CREDIT_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });

      it('should handle FETCH_USER_CREDIT_MOVEMENTS_SUCCESS action type', () => {
        const creditMovements = {
          entries: [
            {
              type: 1,
              value: 0.57,
              formattedValue: '$0.57',
              currency: 'USD',
              description: 'Other Reason (FF fault)',
              createdOn: '/Date(1581071861195)/',
            },
          ],
          number: 1,
          totalItems: 1,
          totalPages: 1,
        };

        const expectedResult = {
          ...state,
          user: { ...state.user, creditMovements },
        };

        expect(
          entitiesMapper[actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS](
            state,
            {
              payload: {
                creditMovements,
              },
              type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('contacts', () => {
      it('should handle FETCH_USER_CONTACTS_SUCCESS action type', () => {
        const idContact1 = 'contact1';
        const contactsEntity = {
          [idContact1]: {
            id: idContact1,
            value: 'TEST',
            countryDetails: {
              countryCode: 'PT',
              countryCallingCode: '351',
            },
            type: 'Phone',
            description: 'TEST',
          },
        };

        const expectedResult = {
          ...state,
          user: { ...state.user, contacts: [idContact1] },
          contacts: { ...contactsEntity },
        };

        expect(
          entitiesMapper[actionTypes.FETCH_USER_CONTACTS_SUCCESS](state, {
            payload: {
              result: [idContact1],
              entities: {
                contacts: { ...contactsEntity },
              },
            },
            type: actionTypes.FETCH_USER_CONTACTS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('addresses', () => {
      describe('create an address', () => {
        const state = {
          addresses: {
            1: { id: 1, address: 'data' },
            2: { id: 2, address: 'data' },
          },
        };

        const newAddress = address1;
        const newAddressResultEntity = {
          [newAddress.id]: { ...newAddress },
        };
        const expectedResult = {
          addresses: {
            ...state.addresses,
            ...newAddressResultEntity,
          },
        };

        it('should handle CREATE_USER_ADDRESS_SUCCESS action type', () => {
          expect(
            entitiesMapper[actionTypes.CREATE_USER_ADDRESS_SUCCESS](state, {
              payload: {
                result: newAddress.id,
                entities: {
                  addresses: {
                    ...newAddressResultEntity,
                  },
                },
              },
              type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
              meta: { addressId: '1' },
            }),
          ).toEqual(expectedResult);
        });
      });

      describe('update an address', () => {
        const state = {
          addresses: {
            1: { id: 1, address: 'data', zipCode: '1111', otherprop: 'prop' },
          },
        };

        const updatedAddress = address1;
        const updatedAddressResultEntity = {
          [updatedAddress.id]: { ...updatedAddress },
        };
        const expectedResult = {
          addresses: {
            ...state.addresses,
            ...updatedAddressResultEntity,
          },
        };

        it('should handle UPDATE_USER_ADDRESS_SUCCESS action type', () => {
          expect(
            entitiesMapper[actionTypes.UPDATE_USER_ADDRESS_SUCCESS](state, {
              payload: {
                result: updatedAddress.id,
                entities: {
                  addresses: {
                    ...updatedAddressResultEntity,
                  },
                },
              },
              type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
              meta: { addressId: '1' },
            }),
          ).toStrictEqual(expectedResult);
        });
      });

      describe('delete adressbook address', () => {
        const state = {
          addresses: {
            1: { id: 1, address: 'data' },
            2: { id: 2, address: 'data' },
          },
        };

        const expectedResult = {
          addresses: {
            2: { id: 2, address: 'data' },
          },
        };

        it('should handle REMOVE_ADDRESS_SUCCESS action type', () => {
          expect(
            entitiesMapper[actionTypes.REMOVE_USER_ADDRESS_SUCCESS](state, {
              meta: { addressId: '1' },
              type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
            }),
          ).toEqual(expectedResult);
        });
      });

      describe('set default shipping address', () => {
        it('should handle SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS action type - With a previous default address', () => {
          const state = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentShipping: false,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentShipping: true,
              },
            },
          };

          // Should unmark the previous default as the default address
          // Should mark the selected address as the default
          const expectedResult = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentShipping: true,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentShipping: false,
              },
            },
          };

          expect(
            entitiesMapper[actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS](
              state,
              {
                meta: { addressId: '1' },
                type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
              },
            ),
          ).toEqual(expectedResult);
        });

        it('should handle SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS action type - Without a previous default address', () => {
          const state = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentShipping: false,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentShipping: false,
              },
            },
          };

          // Should mark the selected address as the default
          const expectedResult = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentShipping: true,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentShipping: false,
              },
            },
          };

          expect(
            entitiesMapper[actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS](
              state,
              {
                meta: { addressId: '1' },
                type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
              },
            ),
          ).toEqual(expectedResult);
        });
      });

      describe('set default billing address', () => {
        it('should handle SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS action type - With a previous default address', () => {
          const state = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentBilling: false,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentBilling: true,
              },
            },
          };

          // Should unmark the previous default as the default address
          // Should mark the selected address as the default
          const expectedResult = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentBilling: true,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentBilling: false,
              },
            },
          };
          expect(
            entitiesMapper[actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS](
              state,
              {
                meta: { addressId: '1' },
                type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
              },
            ),
          ).toEqual(expectedResult);
        });

        it('should handle SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS action type - Without a previous default address', () => {
          const state = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentBilling: false,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentBilling: false,
              },
            },
          };

          // Should mark the selected address as the default
          const expectedResult = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentBilling: true,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentBilling: false,
              },
            },
          };

          expect(
            entitiesMapper[actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS](
              state,
              {
                meta: { addressId: '1' },
                type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
              },
            ),
          ).toEqual(expectedResult);
        });
      });

      describe('set default contact address', () => {
        it('should handle SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS action type - With a previous default address', () => {
          const state = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentPreferred: false,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentPreferred: true,
              },
            },
          };

          // Should unmark the previous default as the default address
          // Should mark the selected address as the default
          const expectedResult = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentPreferred: true,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentPreferred: false,
              },
            },
          };

          expect(
            entitiesMapper[actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS](
              state,
              {
                meta: { addressId: '1' },
                type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
              },
            ),
          ).toEqual(expectedResult);
        });

        it('should handle SET_DEFAULT_CONTACT_ADDRESS_SUCCESS action type - Without a previous default address', () => {
          const state = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentPreferred: false,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentPreferred: false,
              },
            },
          };

          // Should mark the selected address as the default
          const expectedResult = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentPreferred: true,
              },
              2: {
                id: 2,
                address: 'data',
                isCurrentPreferred: false,
              },
            },
          };

          expect(
            entitiesMapper[actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS](
              state,
              {
                meta: { addressId: '1' },
                type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
              },
            ),
          ).toEqual(expectedResult);
        });
      });

      describe('delete default contact address', () => {
        it('should handle REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS action type', () => {
          const state = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentPreferred: true,
              },
            },
          };

          // Should unmark the previous default as the default address
          const expectedResult = {
            addresses: {
              1: {
                id: 1,
                address: 'data',
                isCurrentPreferred: false,
              },
            },
          };

          expect(
            entitiesMapper[
              actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS
            ](state, {
              meta: { addressId: '1', userId: 1 },
              type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
            }),
          ).toEqual(expectedResult);
        });
      });
    });
  });

  describe('getAddresses() selector', () => {
    it('should return the `addresses` property from a given state', () => {
      const addresses = fromReducer.INITIAL_STATE.addresses;

      expect(fromReducer.getAddresses({ ...initialState, addresses })).toBe(
        addresses,
      );
    });
  });
});

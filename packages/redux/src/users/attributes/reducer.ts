import * as actionTypes from './actionTypes';
import type * as T from './types';

export const INITIAL_STATE: T.UserAttributesState = {
  result: null,
  error: null,
  isLoading: false,
};

const attributesReducer = (
  state = INITIAL_STATE,
  action:
    | T.FetchUserAttributesSuccessAction
    | T.FetchUserAttributeSuccessAction,
): T.UserAttributesState => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS:
      return {
        error: INITIAL_STATE.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS:
      let currentResult = state.result;

      if (!currentResult) {
        currentResult = [];
      } else if (!Array.isArray(currentResult)) {
        currentResult = [currentResult];
      }

      const newArray = currentResult && [...currentResult];
      const index =
        currentResult &&
        currentResult.findIndex(
          attribute => attribute?.id === action.payload.id,
        );

      if (index !== -1 && index && newArray) {
        newArray[index] = action.payload;
      }

      return {
        error: INITIAL_STATE.error,
        isLoading: false,
        result:
          index !== -1
            ? newArray
            : currentResult && [...currentResult, action.payload],
      };
    default:
      return state;
  }
};

export default attributesReducer;

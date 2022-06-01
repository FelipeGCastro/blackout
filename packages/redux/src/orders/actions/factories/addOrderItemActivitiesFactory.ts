import {
  ADD_ORDER_ITEM_ACTIVITIES_FAILURE,
  ADD_ORDER_ITEM_ACTIVITIES_REQUEST,
  ADD_ORDER_ITEM_ACTIVITIES_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostOrderItemActivities,
  PostOrderItemActivityData,
} from '@farfetch/blackout-client/orders/types';

/**
 * Method responsible for creating an activity to perform on the order item.
 *
 * @param postOrderItemActivities -
 * @param orderId                 - The identifier of the order.
 * @param itemId                  - The identifier of the item.
 * @param data                    - Request data.
 * @param config                  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const addOrderItemActivities =
  (postOrderItemActivities: PostOrderItemActivities) =>
  (
    orderId: string,
    itemId: string,
    data: PostOrderItemActivityData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: ADD_ORDER_ITEM_ACTIVITIES_REQUEST,
    });

    try {
      await postOrderItemActivities(orderId, itemId, data, config);

      dispatch({
        type: ADD_ORDER_ITEM_ACTIVITIES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: ADD_ORDER_ITEM_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };

export default addOrderItemActivities;

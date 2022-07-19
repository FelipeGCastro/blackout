/**
 * Hook to provide all kinds of data for the business logic attached to the bag.
 */
import {
  addBagItem as addBagItemAction,
  buildBagItem,
  fetchBag as fetchBagAction,
  generateBagItemHash,
  getBag,
  getBagError,
  getBagItems,
  getProduct,
  isBagLoading,
  removeBagItem as removeBagItemAction,
  resetBag as resetBagAction,
  StoreState,
  updateBagItem as updateBagItemAction,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import type {
  AddBagItem,
  FetchBag,
  HandleAddItem,
  HandleAddOrUpdateItem,
  HandleUpdateItem,
  Options,
  RemoveBagItem,
  ResetBag,
  UpdateBagItem,
} from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag business logic.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any bag operation.
 */
const useBag = (options: Options = {}) => {
  const { enableAutoFetch = false } = options;
  const { getState } = useStore<StoreState>();
  // Selectors
  const bag = useSelector(getBag);
  const error = useSelector(getBagError);
  const isLoading = useSelector(isBagLoading);
  const items = useSelector(getBagItems);
  const count = bag?.count;
  const isEmpty = count === 0;
  const isFetched = !!bag?.id && typeof count !== 'undefined' && count >= 0;
  // Actions
  const addBagItem: AddBagItem = useAction(addBagItemAction);
  const updateBagItem: UpdateBagItem = useAction(updateBagItemAction);
  const removeItem: RemoveBagItem = useAction(removeBagItemAction);
  const fetch: FetchBag = useAction(fetchBagAction);
  const reset: ResetBag = useAction(resetBagAction);

  useEffect(() => {
    if (!isLoading && !error && enableAutoFetch && bag?.id) {
      fetch(bag.id);
    }
  }, [bag?.id, enableAutoFetch, error, fetch, isLoading]);

  const handleAddOrUpdateItem: HandleAddOrUpdateItem = useCallback(
    async ({
      customAttributes,
      product,
      productAggregatorId,
      quantity,
      size,
      ...otherParams
    }) => {
      let quantityToHandle = quantity;

      if (!size?.stock || !product) {
        return;
      }

      // Iterate through the stock of different merchants
      for (const { merchantId, quantity: merchantQuantity } of size.stock) {
        // If there is no quantity on this merchant jump to the next one
        if (merchantQuantity === 0) {
          continue;
        }

        // The quantity we want to add might be limited by the merchant stock
        const quantityToAdd = Math.min(quantityToHandle, merchantQuantity);
        // Format the data to send to the request
        const requestData = buildBagItem({
          customAttributes,
          merchantId,
          product,
          productAggregatorId,
          quantity: quantityToAdd,
          size,
          ...otherParams,
        });
        // Checks if the item we want to add is already in bag
        // by comparing the bag items' hash
        const hash = generateBagItemHash(requestData);
        const itemInBag = items?.find(
          item => generateBagItemHash(item) === hash,
        );

        // When the item is in bag, we update its quantity
        if (itemInBag) {
          const newQuantity = quantityToAdd + itemInBag.quantity;

          // Check if our quantity to update fits on the current merchant's stock
          // and if not, try adding less
          for (let i = newQuantity; i > itemInBag.quantity; i--) {
            if (i <= merchantQuantity) {
              await updateBagItem(itemInBag.id, {
                ...requestData,
                quantity: i,
              });

              // Now we have less quantity to add to the next merchant
              quantityToHandle -= i - itemInBag.quantity;
              break;
            }
          }
        } else {
          // When the item is not in the bag, we add it
          await addBagItem(requestData);

          // Now we have less quantity to add to the next merchant
          quantityToHandle -= quantityToAdd;
        }

        // If there's no more quantity to add, we have finished
        if (quantityToHandle === 0) {
          return;
        }
      }
    },
    [addBagItem, items, updateBagItem],
  );

  const addItem: HandleAddItem = useCallback(
    (productId, { quantity, sizeId }) => {
      const state = getState();
      const product = getProduct(state, productId);

      if (!product) {
        throw new Error('Invalid product id');
      }

      const size = product?.sizes?.find(size => size.id === sizeId);

      console.log(product.sizes);

      if (!size) {
        throw new Error('Invalid size id');
      }

      return handleAddOrUpdateItem({
        customAttributes: product?.customAttributes,
        product,
        quantity,
        size,
      });
    },
    [getState, handleAddOrUpdateItem],
  );

  const updateItem: HandleUpdateItem = useCallback(
    (bagItemId, { quantity, sizeId }) => {
      const bagItem = items.find(item => item.id === bagItemId);

      if (!bagItem || !bagItem.product) {
        throw new Error('Invalid bag item id');
      }

      const sizeIdToUpdate = sizeId || bagItem?.size.id;
      const quantityToUpdate = quantity || bagItem?.quantity;

      const sizeToUpdate = bagItem?.product?.sizes?.find(
        size => size.id === sizeIdToUpdate,
      );

      if (!sizeToUpdate) {
        throw new Error('Invalid size id');
      }

      return handleAddOrUpdateItem({
        customAttributes: bagItem?.customAttributes,
        productAggregatorId: bagItem?.productAggregator?.id,
        product: bagItem.product,
        quantity: quantityToUpdate,
        size: sizeToUpdate,
      });
    },
    [handleAddOrUpdateItem, items],
  );

  return {
    isLoading,
    error,
    isFetched,
    actions: {
      fetch,
      reset,
      addItem,
      updateItem,
      removeItem,
    },
    data: {
      ...bag,
      count,
      isEmpty,
      items,
    },
  };
};

export default useBag;

import { compose } from 'lodash/fp';
import { entitiesMapper as entitiesMapperAddresses } from '../../addresses/reducer';
import { entitiesMapper as entitiesMapperAuthentication } from '../../authentication/reducer';
import { entitiesMapper as entitiesMapperBag } from '../../bags/reducer';
import { entitiesMapper as entitiesMapperCheckout } from '../../checkout/reducer';
import { entitiesMapper as entitiesMapperMerchantsLocations } from '../../merchantsLocations/reducer';
import { entitiesMapper as entitiesMapperOrders } from '../../orders/reducer';
import { entitiesMapper as entitiesMapperPayments } from '../../payments/reducer';
import { entitiesMapper as entitiesMapperReturns } from '../../returns/reducer';
import { entitiesMapper as entitiesMapperUsers } from '../../users/reducer';
import { entitiesMapper as entitiesMapperWishlist } from '../../wishlists/reducer';
import { productsEntitiesMapper } from '../../products';
import { subscriptionsEntitiesMapper } from '../../subscriptions';
import createEntitiesReducer from './createEntities';
import type { Reducer } from 'redux';
import type { StoreState } from '../../types';

export type EntitiesReducer = Reducer<StoreState['entities']>;

export type EntitiesReducerByAction = Record<string, EntitiesReducer>;

type DefaultEntitiesReducers = Record<string, EntitiesReducerByAction>;

type DefaultEntitiesReducerCreator = (
  customEntitiesReducers: EntitiesReducerByAction[],
) => EntitiesReducer;

type EntitiesReducerByActionNormalizer = (
  customActionEntitiesReducers: EntitiesReducerByAction[],
) => EntitiesReducerByAction;

// Default entities mappers for all redux functionalities.
// Each `entitiesMapper` has to have an `typeof` in the object key to allow TS to understand
// it's name.
// In a nutshell (https://www.techatbloomberg.com/blog/10-insights-adopting-typescript-at-scale/):
// "If an interface needed by a declaration is not exported, tsc will refuse to inline the type and
// will generate a clear error (e.g., TS4023: Exported variable has or is using name from external
// module but cannot be named.)"
// Playground representation - https://tinyurl.com/a8srpa4u
export const defaultEntitiesReducers: DefaultEntitiesReducers = {
  addresses: entitiesMapperAddresses,
  authentication: entitiesMapperAuthentication,
  bag: entitiesMapperBag,
  checkout: entitiesMapperCheckout,
  merchantsLocations: entitiesMapperMerchantsLocations,
  orders: entitiesMapperOrders,
  payments: entitiesMapperPayments,
  products: productsEntitiesMapper,
  users: entitiesMapperUsers,
  returns: entitiesMapperReturns,
  subscriptions: subscriptionsEntitiesMapper,
  wishlist: entitiesMapperWishlist,
};

// Function that merges entities mappers and runs duplicate action keys.
export const mergeEntitiesReducersByAction: EntitiesReducerByActionNormalizer =
  entitiesMappers => {
    const result: EntitiesReducerByAction = {};
    const duplicatedEntitiesReducers: Record<string, EntitiesReducer[]> = {};

    entitiesMappers.forEach(entityMapper => {
      for (const actionType in entityMapper) {
        if (actionType in result) {
          if (actionType in duplicatedEntitiesReducers) {
            duplicatedEntitiesReducers[actionType]?.push(
              entityMapper[actionType] as EntitiesReducer,
            );
          } else {
            duplicatedEntitiesReducers[actionType] = [
              result[actionType] as EntitiesReducer,
              entityMapper[actionType] as EntitiesReducer,
            ];
          }
        } else {
          result[actionType] = entityMapper[actionType] as EntitiesReducer;
        }
      }
    });

    for (const actionType in duplicatedEntitiesReducers) {
      const newEntityReducer: EntitiesReducer = (state, action) => {
        return compose(
          ...(duplicatedEntitiesReducers[actionType] as EntitiesReducer[]),
        )(state, action);
      };

      result[actionType] = newEntityReducer;
    }

    return result;
  };

const createDefaultEntitiesReducer: DefaultEntitiesReducerCreator = (
  extraMappers = [],
) =>
  createEntitiesReducer(
    mergeEntitiesReducersByAction([
      ...Object.values(defaultEntitiesReducers),
      // These are overrides - must be in the last position
      ...extraMappers,
    ]),
  );

export default createDefaultEntitiesReducer;

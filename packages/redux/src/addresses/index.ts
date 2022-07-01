export * as addressesActionTypes from './actionTypes';

export * from './actions';
export * from './actions/factories';
export * from './selectors';

export {
  default as addressesReducer,
  entitiesMapper as addressesEntitiesMapper,
} from './reducer';

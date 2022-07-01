import {
  getBenefits as getBenefitsGetter,
  getContacts as getContactsGetter,
  getCredit as getCreditGetter,
  getCreditMovements as getCreditMovementsGetter,
  getError,
  getIsLoading,
  getPreferences as getPreferencesGetter,
  getTitles as getTitlesGetter,
  getUpdatePreferences as getUpdatePreferencesGetter,
  getUserAttributes as getUserAttributesGetter,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import type { StoreState } from '../types';
import type { UsersState } from './types';

/**
 * Returns the loading status for the users operations.
 *
 * @param state - Application state.
 *
 * @returns Users operation Loading status.
 */
export const areUsersLoading = (state: StoreState) =>
  getIsLoading(state.users as UsersState);

/**
 * Returns the users error.
 *
 * @param state - Application state.
 *
 * @returns Users operation error.
 */
export const getUsersError = (state: StoreState) =>
  getError(state.users as UsersState);

/**
 * Returns the loading status for the benefits operation.
 *
 * @param state - Application state.
 *
 * @returns Benefits operation Loading status.
 */
export const isBenefitsLoading = (state: StoreState) =>
  getBenefitsGetter(state.users as UsersState).isLoading;

/**
 * Returns the benefits error.
 *
 * @param state - Application state.
 *
 * @returns Benefits operation error.
 */
export const getBenefitsError = (state: StoreState) =>
  getBenefitsGetter(state.users as UsersState).error;

/**
 * Returns the benefits entity.
 *
 * @param state - Application state.
 *
 * @returns Benefits entity.
 */
export const getBenefits = (state: StoreState) =>
  getEntities(state, 'benefits');

/**
 * Returns the loading status for the preferences operation.
 *
 * @param state - Application state.
 *
 * @returns Preferences operation Loading status.
 */
export const isPreferencesLoading = (state: StoreState) =>
  getPreferencesGetter(state.users as UsersState).isLoading;

/**
 * Returns the preferences error.
 *
 * @param state - Application state.
 *
 * @returns Preferences operation error.
 */
export const getPreferencesError = (state: StoreState) =>
  getPreferencesGetter(state.users as UsersState).error;

/**
 * Returns the loading status for the update preferences operation.
 *
 * @param state - Application state.
 *
 * @returns Update preferences operation Loading status.
 */
export const isUpdatingPreferences = (state: StoreState) =>
  getUpdatePreferencesGetter(state.users as UsersState).isLoading;

/**
 * Returns the update preferences error.
 *
 * @param state - Application state.
 *
 * @returns Update preferences operation error.
 */
export const getUpdatePreferencesError = (state: StoreState) =>
  getUpdatePreferencesGetter(state.users as UsersState).error;

/**
 * Returns the preferences entity.
 *
 * @param state - Application state.
 *
 * @returns Preferences entity.
 */
export const getPreferences = (state: StoreState) =>
  getEntities(state, 'preferences');

/**
 * Returns the loading status for the titles operation.
 *
 * @param state - Application state.
 *
 * @returns Titles operation Loading status.
 */
export const areTitlesLoading = (state: StoreState) =>
  getTitlesGetter(state.users as UsersState).isLoading;

/**
 * Returns the titles error.
 *
 * @param state - Application state.
 *
 * @returns Titles operation error.
 */
export const getTitlesError = (state: StoreState) =>
  getTitlesGetter(state.users as UsersState).error;

/**
 * Returns the titles entity.
 *
 * @param state - Application state.
 *
 * @returns Titles entity.
 */
export const getTitles = (state: StoreState) => getEntities(state, 'titles');

/**
 * Returns the specified title from titles entity .
 *
 * @param state   - Application state.
 * @param titleId - Title identifier.
 *
 * @returns Title details.
 */
export const getTitleById = (state: StoreState, titleId: string) =>
  getEntityById(state, 'titles', titleId);

/**
 * Returns the loading status for the credit operation.
 *
 * @param state - Application state.
 *
 * @returns Credit operation Loading status.
 */
export const isCreditLoading = (state: StoreState) =>
  getCreditGetter(state.users as UsersState).isLoading;

/**
 * Returns the credit error.
 *
 * @param state - Application state.
 *
 * @returns Credit operation error.
 */
export const getCreditError = (state: StoreState) =>
  getCreditGetter(state.users as UsersState).error;

/**
 * Returns the loading status for the credit movements operation.
 *
 * @param state - Application state.
 *
 * @returns Credit movements operation Loading status.
 */
export const isCreditMovementsLoading = (state: StoreState) =>
  getCreditMovementsGetter(state.users as UsersState).isLoading;

/**
 * Returns the credit movements error.
 *
 * @param state - Application state.
 *
 * @returns Credit movements operation error.
 */
export const getCreditMovementsError = (state: StoreState) =>
  getCreditMovementsGetter(state.users as UsersState).error;

/**
 * Returns the loading status for the contacts operation.
 *
 * @param state - Application state.
 *
 * @returns Contacts operation Loading status.
 */
export const isContactsLoading = (state: StoreState) =>
  getContactsGetter(state.users as UsersState).isLoading;

/**
 * Returns the contacts error.
 *
 * @param state - Application state.
 *
 * @returns Contacts operation error.
 */
export const getContactsError = (state: StoreState) =>
  getContactsGetter(state.users as UsersState).error;

/**
 * Returns the contacts entity.
 *
 * @param state - Application state.
 *
 * @returns Contacts entity.
 */
export const getContacts = (state: StoreState) =>
  getEntities(state, 'contacts');

/**
 * Returns the loading status for the user attributes operation.
 *
 * @param state - Application state.
 *
 * @returns User attributes operation Loading status.
 */
export const isUserAttributesLoading = (state: StoreState) =>
  getUserAttributesGetter(state.users as UsersState).isLoading;

/**
 * Returns the user attributes error.
 *
 * @param state - Application state.
 *
 * @returns User attributes operation error.
 */
export const getUserAttributesError = (state: StoreState) =>
  getUserAttributesGetter(state.users as UsersState).error;

/**
 * Returns the user attributes.
 *
 * @param state - Application state.
 *
 * @returns User attributes.
 */
export const getUserAttributes = (state: StoreState) =>
  getUserAttributesGetter(state.users as UsersState).result;

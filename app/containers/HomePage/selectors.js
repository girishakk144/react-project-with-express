import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

const userDetails = () =>
  createSelector(selectHomePageDomain, states => states.userDetails
  );

const title = () =>
  createSelector(selectHomePageDomain, states => states.title
  );

const userList = () =>
  createSelector(selectHomePageDomain, states => states.userList
  );

const loaderEnable = () =>
  createSelector(selectHomePageDomain, states => states.loaderEnable
  );

export default makeSelectHomePage;
export { selectHomePageDomain, userDetails, title, userList, loaderEnable };

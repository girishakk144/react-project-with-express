/*
 *
 * HomePage actions
 *
 */

import { ON_CHANGE_HANDLER, SAVE_USER, FETCH_USER_DETAILS, UPDATE_USER_DETAILS, DELETE_USER, CLEAR_USER_DETAILS, ENABLE_LOADING } from './constants';

export function fetchUserDetails() {
	return {
	  type: FETCH_USER_DETAILS,
	};
}

export function updateUserDetails(payload) {
	return {
	  type: UPDATE_USER_DETAILS,
	  payload
	};
}

export function onChangeHandler(value, fieldName) {
  return {
	type: ON_CHANGE_HANDLER,
	value, fieldName
  };
}

export function saveUser() {
	return {
	  type: SAVE_USER,
	};
}

export function deleteUser(id) {
	return {
	  type: DELETE_USER,
	  id
	};
}

export function clearUserDetails() {
	return {
	  type: CLEAR_USER_DETAILS,
	};
}

export function enableLoading(value) {
	return{
		type: ENABLE_LOADING,
		value
	}
}

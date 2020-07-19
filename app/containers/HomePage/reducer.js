/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { ON_CHANGE_HANDLER, UPDATE_USER_DETAILS, CLEAR_USER_DETAILS, ENABLE_LOADING } from './constants';

export const initialState = {
	userList:[],
	userDetails:{
		fname: "",
		lname: "",
		email: "",
		phone: ""
	},
	title:"",
	loaderEnable: false

};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft  => {
    switch (action.type) {
	  case UPDATE_USER_DETAILS:{
		return produce(state, draft =>{
			draft.userList = action.payload
		})
	  }
      case ON_CHANGE_HANDLER:{
		return produce(state, draft =>{
			draft.userDetails[action.fieldName] = action.value;
		})
	  }
	  case CLEAR_USER_DETAILS:{
		  const emptyObj={
			fname: "",
			lname: "",
			email: "",
			phone: ""}
		return produce(state, draft =>{
			draft.userDetails = emptyObj
		})
	  }
	  case ENABLE_LOADING:{
		  return produce(state, draft =>{
			  draft.loaderEnable = action.value
		  })
	  }
        break;
    }
  });

export default homePageReducer;

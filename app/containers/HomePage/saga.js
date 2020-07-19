import { take, call, put, select, takeEvery,delay } from 'redux-saga/effects';
import { SAVE_USER, FETCH_USER_DETAILS, DELETE_USER } from './constants';
import { userDetails } from './selectors';
import { updateUserDetails, clearUserDetails, enableLoading } from './actions';

function* fetchUserDetails(){
	const baseUrl = `http://localhost:5000/app/user`;
	const requestOptions={
		method: "GET",
		headers:{ 'Content-Type': 'application/json' },
	}
	try{
		const response = yield fetch(baseUrl, requestOptions)
		const userInfo = yield response.json()
		yield put(updateUserDetails(userInfo))
	}catch(err){
		console.log(err)
	}
}

function* saveUser(){
	const user = yield select(userDetails())
	const baseUrl = `http://localhost:5000/app/user`;
	const requestOptions={
		method: "POST",
		headers:{ 'Content-Type': 'application/json' },
		body:JSON.stringify(user)
	}
	try{
		const response = yield fetch(baseUrl, requestOptions)
		if (response.status < 200 || response.status > 299) {
			yield put(enableLoading(false))
			throw new Error("Something went wrong");
		}
		const userInfo = yield response.json()
		yield delay(10)
		yield put(enableLoading(false))
		yield put(updateUserDetails(userInfo))
		yield put(clearUserDetails())
		
	}catch(e){
		console.log("Something went wrong")
	}

}

function* deletUser(data){
	const baseUrl =	`http://localhost:5000/app/user/${data.id}`;
	const requestOptions={
		method: 'DELETE',
		headers:{'Content-Type': 'application/json'}
	}
	try{
		const response = yield fetch(baseUrl, requestOptions)
		const userInfo = yield response.json()
		yield put(updateUserDetails(userInfo))
		
	}catch(err){
		console.log(err)
	}

}
// Individual exports for testing
export default function* homePageSaga() {
  yield takeEvery(FETCH_USER_DETAILS, fetchUserDetails)
  yield takeEvery(SAVE_USER, saveUser)
  yield takeEvery(DELETE_USER, deletUser)
}

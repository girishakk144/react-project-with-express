/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
	userDetails, 
	title, 
	userList, 
	loaderEnable
} from './selectors';
import { 
	onChangeHandler, 
	saveUser, 
	fetchUserDetails, 
	deleteUser, 
	enableLoading
} from './actions';

export class HomePage extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}

	componentDidMount(){
		this.props.fetchUserDetails()
	}

	onChangeHandler = (event, fieldName) =>{
		if(fieldName === 'phone'){
			const x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
			event.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
		}
		this.props.onChangeHandler(event.target.value, fieldName)
	}

	keyPressHandler=(e) =>{
		if(e.which === 13) this.saveUser()
	}

	saveUser = async() =>{
		await this.props.enableLoading(true)
		await this.props.saveUser()
	}

	deleteUser = (id) =>{
		this.props.deleteUser(id)
	}
	
	render(){
		return(
			<div>
				<h1>{this.props.title}</h1>
				<input type="text" value={this.props.userDetails.fname} onKeyPress={(e) => this.keyPressHandler(e)} onChange={(e) =>this.onChangeHandler(e, 'fname')} placeholder="First Name"></input>
				<input type="text" value={this.props.userDetails.lname} onKeyPress={(e) => this.keyPressHandler(e)} onChange={(e) =>this.onChangeHandler(e, 'lname')} placeholder="Last Name"></input>
				<input type="text" value={this.props.userDetails.email} onKeyPress={(e) => this.keyPressHandler(e)} onChange={(e) =>this.onChangeHandler(e, 'email')} placeholder="Email"></input>
				<input type="text" value={this.props.userDetails.phone} onKeyPress={(e) => this.keyPressHandler(e)} onChange={(e) =>this.onChangeHandler(e, 'phone')} placeholder="Phone"></input>
				<button onClick={this.saveUser}>{this.props.loaderEnable ? 'Saving...' : 'Save'}</button>
				<div>
					{ this.props.userList.map(list =>(
						<div key={list._id}>FirstName: {list.fname}, LastName: {list.lname}, Email: {list.email}, Phone: {list.phone}, <button onClick={() =>this.deleteUser(list._id)}>Delete</button></div> 
					))}
				</div>
			</div>
		)
	}
  
}

HomePage.propTypes = {
	onChangeHandler: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  userDetails: userDetails(),
  title: title(),
  userList: userList(),
  loaderEnable: loaderEnable(),
});

function mapDispatchToProps(dispatch) {
  return {
	onChangeHandler: (value, fieldName)=> dispatch(onChangeHandler(value, fieldName)),
	saveUser: ()=> dispatch(saveUser()),
	fetchUserDetails: () => dispatch(fetchUserDetails()),
	deleteUser: (id) => dispatch(deleteUser(id)),
	enableLoading: (value) => dispatch(enableLoading(value))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);

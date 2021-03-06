import React, { Component } from 'react';
import './Login.css';
import SignUp from '../SignUp/SignUp.js';
import UserRepository from '../../api/userRepository';
import { Redirect } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null,
			validLogin: true
		};
		this.verifyUser = this.verifyUser.bind(this);
	}
	userRepository = new UserRepository();
	verifyUser = async (e) => {
		e.preventDefault();
		const USER = {
			user_name: this.state.username,
			user_password: this.state.password
		}
		this.userRepository.login(USER).then(res => {
			if (res) {
				localStorage.setItem('token', res)
				this.props.login();
				this.props.history.push('/home')
			} 
			return res.data
		}).catch(err => {
			this.setState({validLogin: false})
		})
	};
	render() {
		if (localStorage.getItem('token')) {
			return <Redirect to="/home" />;
		}
		return (
			<>
				<Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Navbar.Brand style={{textDecoration: 'none', marginLeft: '1em'}}><h3>Recipeazy</h3></Navbar.Brand>
				</Navbar>
				<div className="login">
					<div className="form-horizontal login-form col-md-3 center-login shadow-lg">
						<h1 className="nobold">Login:</h1>
						<hr />
						<form>
							<div className="form-group">
								<label htmlFor="username">Username:</label>
								<input id="username" className="form-control" type="text" onChange={(event) =>
									this.setState({ username: event.target.value })}>
								</input>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password:</label>
								<input id="password" className="form-control" type="password" onChange={(event) =>
									this.setState({ password: event.target.value })}>
								</input>
							</div>
							{!this.state.validLogin && <p style={{color: 'red', fontWeight: 'bold'}}>Invalid Username or password</p>}
							<button type="button" className="btn btn-primary w-100 mb-2" onClick={this.verifyUser}>Log In</button>
						</form>
						<SignUp history={this.history} className="center-sign" />
					</div>
				</div>
			</>

		);
	}
}
export default Login;
//export default withRouter(Login);
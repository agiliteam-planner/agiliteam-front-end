import React from 'react';
import axios from 'axios';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import '../styles/Login.css';

function Login({ setCurrentUser }) {
	const { currentUser } = useContext(UserContext);
	const navigate = useNavigate();

	const initialState = {
		username: '',
		password: '',
	};
	const [formState, setFormState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [userExist, setUserExist] = useState(true);
	const [passwordMatch, setPasswordMatch] = useState(true);

	const baseUrl = process.env.REACT_APP_BACKEND_URL;

	function handleChange(ev) {
		setFormState({ ...formState, [ev.target.id]: ev.target.value });
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		getUserInfo(baseUrl);
	}

	function handleLogout(ev) {
		setCurrentUser(null);
		navigate('/');
	}

	async function getUserInfo(url) {
		// get the user info from the database
		setLoading(true);
		try {
			const res = await axios.get(
				`${url}/users?username=${formState.username}`
			);
			if (res.status === 200) {
				// Check if username exist and if the password is correct
				validateUser(res.data[0]);
			} else {
				setError('Could not get users data');
				setLoading(false);
			}
		} catch (err) {
			setError('Something went wrong. Please go back and try again.');
			setLoading(false);
		}
	}

	function validateUser(user) {
		// Check if username exist and if the password is correct
		if (user) {
			setUserExist(true);
			if (user.password === formState.password) {
				// username and password match
				setPasswordMatch(true);
				setCurrentUser(user);
				// go to previous page
				navigate(-1);
			} else {
				setPasswordMatch(false);
			}
		} else {
			setUserExist(false);
		}
	}

	return currentUser ? (
		<div className='login-logout main-section-style'>
			<p className='logout-message'>
				{currentUser.firstName} is already logged in. Do you want to logout?
			</p>
			<button className='login-button' onClick={handleLogout}>
				Logout
			</button>
		</div>
	) : (
		<div className='login-wrapper main-section-style'>
			<form id='login-form' onSubmit={handleSubmit}>
				<h2>Enter username & password</h2>
				<div className='login-input'>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						placeholder='Username'
						id='username'
						required
						pattern='[a-z0-9]{6,12}'
						value={formState.username}
						onChange={handleChange}
					/>
				</div>

				<div className='login-input'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						placeholder='Password'
						required
						id='password'
						value={formState.password}
						onChange={handleChange}
					/>
				</div>
			</form>
			<div className='login-buttons'>
				<button className='login-button' type='submit' form='login-form'>
					Submit
				</button>
				<button
					type='button'
					className='login-button'
					onClick={() => navigate(-1)}>
					Cancel
				</button>
			</div>
			<div className='login-message'>
				{userExist ? '' : 'Could not find username, please try again.'}
				{passwordMatch ? '' : 'Password is incorrect, please try again.'}
			</div>
		</div>
	);
}

export default Login;

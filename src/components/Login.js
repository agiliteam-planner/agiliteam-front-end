import React from 'react';
import axios from 'axios';

import { useContext, useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import '../styles/Login.css';

function Login({ setUser }) {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const initialState = {
		username: '',
		password: '',
	};
	const [formState, setFormState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const baseUrl = process.env.REACT_APP_BACKEND_URL;

	function handleChange(ev) {
		setFormState({ ...formState, [ev.target.id]: ev.target.value });
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		console.log('submit:', formState);
		validateUser(baseUrl);
	}

	async function validateUser(url) {
		// get the user info from the database
		setLoading(true)
		try {
			const res = await axios.get(`${url}/users?username=${formState.username}`);
			if (res.status === 200) {
				const fetchedUser = res.data[0];
				console.log(res.data);
				// setUsers(res.data);
			} else {
				setError('Could not get users data');
				setLoading(false);
			}
		} catch (err) {
			setError('Something went wrong. Please go back and try again.');
			setLoading(false);
			// console.log('error:', err.response.data);
		}
	}

	function handleLogout(params) {
		console.log('logout');
		// setUser({ username: '', password: '' });
	}

	return (
		<div className='login-wrapper'>
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
		</div>
	);
}

export default Login;

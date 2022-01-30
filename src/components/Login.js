import React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

function Login(props) {
	const { user, setUser } = useContext(UserContext);
	const [formState, setFormState] = useState('');

	function handleChange(ev) {
		// console.log(ev.target.value);
		setFormState(ev.target.value);
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		console.log(formState);
		setUser({ username: formState });
		console.log(user);
		setFormState('');
	}

	function handleLogout(params) {
		console.log('logout');
		setUser({ username: '', lastLogIn: '' });
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h2>Hello from Login</h2>
				<label htmlFor='username'> Username: </label>
				<input
					id='username'
					type='text'
					required
					onChange={handleChange}
					value={formState}></input>
				<button type='submit'>Submit</button>
			</form>
			<button onClick={handleLogout}>Logout</button>
		</>
	);
}

export default Login;

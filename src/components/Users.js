import { useState, useEffect } from 'react';
import axios from 'axios';

import User from './User';

import '../styles/Users.css';

function Users(props) {
	const [users, setUsers] = useState([]);
	const [edits, setEdits] = useState({});
	const [editingUser, setEditingUser] = useState(null);

	// const backendUrl = 'https://agiliteam-mern.herokuapp.com';
	const backendUrl = process.env.REACT_APP_BACKEND_URL;

	// On initial mount
	useEffect(() => {
		// IIFE to make it async
		(async () => {
			try {
				const response = await axios.get(`${backendUrl}/users`);
				setUsers(response.data);
			} catch (error) {
				// TODO: Handle errors for user
				console.error(error);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editingUser]);

	// Change editing user state if no other editing is happening
	function startNewUser() {
		setEditingUser('NEW_USER');
		setEdits({ ...edits, _id: 'NEW_USER' });
	}

	function handleChange(e) {
		setEdits({ ...edits, [e.target.id]: e.target.value });
	}

	// Delete user and reload page
	function handleDelete(userID) {
		axios
			.delete(`${backendUrl}/users/${userID}`)
			.then((res) => console.log(res))
			.finally(clearEditingStates);
	}

	// Clear editing variables and reload page
	function clearEditingStates() {
		setEditingUser(null);
		setEdits({});
	}

	// TODO: Should this function be async or useEffect?
	function handleSubmit(event) {
		event.preventDefault();

		if (edits._id !== 'NEW_USER') {
			// Update user
			axios
				.put(`${backendUrl}/users/${edits._id}`, edits)
				.then((res) => console.log(res))
				.finally(clearEditingStates);
		} else {
			const userToPost = edits;
			delete userToPost._id; // Remove temporary _id property
			axios
				.post(`${backendUrl}/users`, userToPost)
				.then((res) => console.log(res))
				.finally(clearEditingStates);
		}
	}

	return (
		<div className='settings-panel users'>
			<h3>Manage Users</h3>
			<div className='users-wrapper'>
				{users.map((user) => (
					<User
						key={user._id}
						user={user}
						editingUser={editingUser}
						edits={edits}
						setEditingUser={setEditingUser}
						handleChange={handleChange}
						handleDelete={handleDelete}
						clearEditingStates={clearEditingStates}
						handleSubmit={handleSubmit}
						setEdits={setEdits}
					/>
				))}
			</div>
			{editingUser !== 'NEW_USER' ? (
				<button onClick={startNewUser}>Add New User</button>
			) : (
				<form className='new-user-form'>
					<div className='new-user-form-wrapper'>
						<h2 style={{ textAlign: 'center' }}>Add New User</h2>
						<legend>First Name:</legend>
						<input
							type='text'
							onChange={handleChange}
							id='firstName'
							value={edits?.firstName ?? users.firstName}></input>
						<legend style={{ paddingTop: '15px' }}>Last Name:</legend>
						<input type='text' onChange={handleChange} id='lastName'></input>
						<legend style={{ paddingTop: '15px' }}>
							User Name (6-10 characters):
						</legend>
						<input type='text' onChange={handleChange} id='username'></input>
					</div>
				</form>
			)}
			{editingUser !== 'NEW_USER' ? null : (
				<div>
					<button onClick={handleSubmit}>Add User</button>
					<button onClick={clearEditingStates}>Cancel</button>
				</div>
			)}
		</div>
	);
}

export default Users;

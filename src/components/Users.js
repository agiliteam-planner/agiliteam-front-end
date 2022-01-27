import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import User from './User';

import '../styles/Users.css';

function Users(props) {
	const [users, setUsers] = useState([]);
	const [edits, setEdits] = useState({});
	const [editingUser, setEditingUser] = useState(null);
	const navigate = useNavigate();

	const newUser = {
		_id: 'NEW_USER',
		username: '',
		firstName: '',
		lastName: '',
		image: '',
	};
	// TODO: Move url to a settings location or env variable?
	const backendUrl = 'https://arcane-plateau-58687.herokuapp.com';

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
	}, [editingUser, handleSubmit]);

	// Change editing user state if no other editing is happening
	function handleRowClick(userID) {
		if (editingUser) return; // do nothing

		setEditingUser(userID);
		let userToEdit;

		if (userID === 'NEW_USER') {
			userToEdit = { _id: userID };
		} else {
			userToEdit = users.find((user) => user._id === userID);
		}
		setEdits({ ...userToEdit });
	}

	function handleChange(e) {
		setEdits({ ...edits, [e.target.id]: e.target.value });
	}

	// TODO: Should this function be
	function handleSubmit(e) {
		e.preventDefault();

		if (edits._id !== 'NEW_USER') {
			// Update user
			axios
				.put(`${backendUrl}/users/${edits._id}`, edits)
				.then((res) => console.log(res));
		} else {
			const userToPost = edits;
			delete userToPost._id; // Remove temporary _id property
			axios
				.post(`${backendUrl}/users`, userToPost)
				.then((res) => console.log(res));
		}

		setEditingUser(null);
		setEdits({});

		// Trigger refresh
		navigate('/settings', { replace: true });
	}

	return (
		<div>
			<div className='settings-users'>
				<h3>Manage Users</h3>
				<form id='edit-users' action='' onSubmit={handleSubmit}>
					<table className='users-table'>
						<thead>
							<tr>
								<th>Username</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>{/* Controls Row */}</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<User
									key={user._id}
									user={user}
									editingUser={editingUser}
									edits={edits}
									handleRowClick={handleRowClick}
									handleChange={handleChange}
								/>
							))}
							{editingUser === 'NEW_USER' && (
								<User
									key='NEW_USER'
									user={newUser}
									editingUser={editingUser}
									edits={edits}
									handleRowClick={handleRowClick}
									handleChange={handleChange}
								/>
							)}
						</tbody>
					</table>
					{/* Display New User Button if not editing */}
					{!editingUser && (
						<button
							type='button'
							onClick={() => handleRowClick('NEW_USER')}
							id='new-user'>
							New User
						</button>
					)}
				</form>
			</div>
		</div>
	);
}

export default Users;

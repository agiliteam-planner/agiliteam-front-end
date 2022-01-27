function Users({ user, editingUser, edits, handleRowClick, handleChange }) {
	// Handle table header if no user object was passed
	if (typeof user !== 'object') {
		return (
			<tr>
				<th>Username</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th></th>
			</tr>
		);
	}

	if (editingUser === user._id) {
		// Show editing fields
		return (
			<tr id={user._id}>
				<td>
					<input
						type='text'
						form='edit-users'
						id='username'
						onChange={handleChange}
						value={edits?.username ?? user.username}
					/>
				</td>
				<td>
					<input
						type='text'
						form='edit-users'
						id='firstName'
						onChange={handleChange}
						value={edits?.firstName ?? user.firstName}
					/>
				</td>
				<td>
					<input
						type='text'
						form='edit-users'
						id='lastName'
						onChange={handleChange}
						value={edits?.lastName ?? user.lastName}
					/>
				</td>
				<td>
					<button type='submit'>Save</button>
				</td>
			</tr>
		);
	} else {
		// Not editing: Display normal user row
		return (
			<tr onClick={() => handleRowClick(user._id)} id={user._id}>
				<td>{user.username}</td>
				<td>{user.firstName}</td>
				<td>{user.lastName}</td>
				<td className='click-edit'>(click to edit)</td>
			</tr>
		);
	}
}

export default Users;

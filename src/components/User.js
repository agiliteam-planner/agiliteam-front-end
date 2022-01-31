import '../styles/User.css';
function Users({
	user,
	editingUser,
	edits,
	handleChange,
	handleDelete,
	clearEditingStates,
	setEditingUser,
	handleSubmit,
	setEdits,
}) {
	function startEdit(e) {
		if (editingUser) return;
		setEditingUser(user._id);
		let userToEdit = {
			_id: user._id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
		};
		setEdits({ ...userToEdit });
	}
	if (editingUser === user._id) {
		// Show editing fields
		return (
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<legend style={{ backgroundColor: 'lightblue', padding: '5px' }}>
					First Name
				</legend>
				<input
					type='text'
					form='edit-users'
					id='firstName'
					pattern='[a-z0-9]'
					onChange={handleChange}
					value={edits?.firstName ?? user.firstName}
					required
				/>
				<legend style={{ backgroundColor: 'lightblue', padding: '5px' }}>
					Last Name
				</legend>
				<input
					type='text'
					form='edit-users'
					id='lastName'
					pattern='[a-z0-9]'
					onChange={handleChange}
					value={edits?.lastName ?? user.lastName}
					required
				/>
				<legend style={{ backgroundColor: 'lightblue', padding: '5px' }}>
					Username
				</legend>
				<input
					type='text'
					form='edit-users'
					id='username'
					pattern='[a-z0-9_-]{6,12}'
					onChange={handleChange}
					value={edits?.username ?? user.username}
					required
				/>
				<div className='user-control'>
					<button type='submit' id='save' onClick={handleSubmit}>
						Save
					</button>
					{user._id !== 'NEW_USER' && (
						<button
							type='button'
							id='delete'
							onClick={() => handleDelete(user._id)}>
							Delete
						</button>
					)}
					<button type='button' id='cancel' onClick={clearEditingStates}>
						Cancel
					</button>
				</div>
			</form>
		);
	} else {
		// Not editing: Display normal user row
		return (
			<div className='user-card card-style' onClick={startEdit}>
				<div className='user-realname'>
					<div className='user-name-header'>Name:</div>
					<div className='user-name-values'>
						{user.firstName} {user.lastName}
					</div>
				</div>
				<div className='user-username'>
					<div className='username-header'>Username:</div>
					<div className='username-value'>{user.username}</div>
				</div>
			</div>
		);
	}
}

export default Users;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useMatch } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// Bring in CSS style

import '../styles/TaskDetails.css';

// import data from '../tasks.json';
function TaskDetails(props) {
	const { params } = useMatch('/task/:id');
	const { currentUser } = useContext(UserContext);
	const id = params.id;
	const newTask = id === 'new' ? true : false;

	const navigate = useNavigate();

	// API url
	const baseUrl = process.env.REACT_APP_BACKEND_URL;

	// temporary array of users
	const [users, setUsers] = useState([]);
	const priorities = ['High', 'Medium', 'Low'];

	// Initialize Task state
	const newTaskDefault = {
		title: '',
		description: '',
		stage: '',
		priority: '1',
		checklist: [],
		dueDate: '',
		files: [],
		comments: [],
		owner: null,
	};

	// New comment state
	let [newComment, setNewComment] = useState('');

	// Stages state
	const [stages, setStages] = useState([]); // Available stages
	const [task, setTask] = useState(null); // Task object
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [showDeleteModal, setDeleteModal] = useState(false); // show modal before delete

	// When component mount, fetch task details IF id is not 'new'
	useEffect(() => {
		// get all needed data from API
		getData(baseUrl);
	}, [id]);

	// ----------- API Calls ----------------

	async function getData(url) {
		// start loading data from API
		setLoading(true);
		setError('');
		try {
			// Fetch settings
			let res = await axios.get(`${url}/settings`);
			if (res.status === 200) {
				setStages(res.data[0].stages);
			} else {
				setError('Could not get settings data');
				setLoading(false);
			}
			// Fetch users
			res = await axios.get(`${url}/users`);
			if (res.status === 200) {
				setUsers(res.data);
			} else {
				setError('Could not get users data');
				setLoading(false);
			}
			if (newTask) {
				setTask(newTaskDefault);
				setLoading(false);
			} else {
				res = await axios.get(`${url}/tasks/${id}`);
				if (res.status === 200) {
					setTask(res.data);
				} else {
					setError('Could not get task data');
				}
				setLoading(false);
			}
		} catch (err) {
			setError('Something went wrong. Please go back and try again.');
			setLoading(false);
		}
	}
	// POST a new task
	function postTask(url) {
		axios.post(url, task).then((res) => {});
		// Go to main view after posting a new task
		navigate('/');
	}

	// UPDATE a task
	function updateTask(url) {
		axios.put(url, task).then((res) => {});
		// Go to main view after updating a task
		navigate('/');
	}

	// DELETE a task
	function deleteTask(url) {
		axios.delete(url).then((res) => {});
		// Go to main view after deleting a task
		navigate('/');
	}

	// ------ Helper Functions ---------------------
	function titleIsValidated() {
		return /[a-z]/i.test(task.title);
	}
	function commentIsValidated() {
		return /[a-z]/i.test(newComment) && currentUser;
	}

	function formatTime(time) {
		const commentTime = new Date(time);
		const day = String(commentTime).match(/(([a-z]+) ([a-z]+) (\d+))/i)[0];
		const hour = String(commentTime).match(/(\d\d:\d\d)/)[0];
		return `${day} ${hour}`;
	}

	function confirmDelete(confirm) {
		setDeleteModal(false);
		// Delete task if confirmed
		confirm && deleteTask(`${baseUrl}/tasks/${id}`);
	}

	// ------------ Handle Events ---------------
	function handleDeleteTask(ev) {
		ev.preventDefault();
		// Open a model to get confirmation
		setDeleteModal(true);
	}

	function handleComment(ev) {
		ev.preventDefault();
		const tmpTask = task;
		const timeStamp = new Date().toISOString();
		tmpTask.comments.push({
			user: currentUser,
			time: timeStamp,
			content: newComment,
		});
		setTask(tmpTask);
		setNewComment('');
	}

	function handleChange(ev) {
		setTask({ ...task, [ev.target.id]: ev.target.value });
	}

	function handleTaskSubmit(ev) {
		ev.preventDefault();
		// Task object validation
		if (!task.stage) {
			task.stage = stages[0];
		}
		if (!task.owner) task.owner = null;

		if (newTask) {
			postTask(`${baseUrl}/tasks`);
		} else {
			updateTask(`${baseUrl}/tasks/${id}`);
		}
	}

	if (loading)
		return (
			<div className='loading-message'>
				<div>Loading data ...</div>
			</div>
		);
	else if (error)
		return (
			<div className='error-message'>
				<div className='error-content'>{error}</div>
				<button className='error-button' onClick={() => navigate('/')}>
					Go Back to Safety
				</button>
			</div>
		);
	if (!task) return <div>Waiting for task information ...</div>;
	return (
		<div className='task-details main-section-style'>
			{showDeleteModal && (
				<div className='delete-confirm-wrapper'>
					<div className='delete-confirm-modal'>
						<div>
							Are you sure you want to delete <br />"{task.title}"?
						</div>
						<button
							className='task-button confirm-button'
							onClick={() => {
								confirmDelete(true);
							}}>
							Delete
						</button>
						<button
							className='task-button confirm-button'
							onClick={() => {
								confirmDelete(false);
							}}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{/* <h2 className='section-heading-style'>
				{newTask ? 'New Task' : 'Edit Task'}
			</h2> */}
			<div className='task-details panel-style'>
				<h3>{newTask ? 'New Task' : 'Edit Task'}</h3>
				<form
					id='task-details-form'
					onSubmit={(ev) => {
						ev.preventDefault();
					}}>
					<div className='task-title-wrapper'>
						<label htmlFor='title'>Title</label>
						<input
							className={titleIsValidated() ? '' : 'required-field'}
							type='text'
							id='title'
							maxLength='70'
							onChange={handleChange}
							placeholder='Task Title - required field'
							value={task.title}
						/>
					</div>
					<div className='task-selectors-wrapper'>
						<div className='task-duedate-selector task-selector'>
							<label htmlFor='dueDate'>Due Date</label>
							<input
								type='date'
								id='dueDate'
								onChange={handleChange}
								placeholder='Task Description'
								value={task.dueDate ? task.dueDate.slice(0, 10) : ''}
							/>
						</div>
						<div className='task-stage-selector task-selector'>
							<label htmlFor='stage'>Stage</label>
							<select id='stage' onChange={handleChange} value={task.stage}>
								{stages.map((stage, idx) => {
									return (
										<option key={idx} value={stage}>
											{stage}
										</option>
									);
								})}
							</select>
						</div>
						<div className='task-priority-selector task-selector'>
							<label htmlFor='priority'>Priority</label>
							<select
								id='priority'
								onChange={handleChange}
								value={task.priority}>
								{priorities.map((priority, idx) => {
									return (
										<option key={idx} value={idx}>
											{priority}
										</option>
									);
								})}
							</select>
						</div>
						<div className='task-owner-selector task-selector'>
							<label htmlFor='owner'>Owner</label>
							<select
								id='owner'
								onChange={handleChange}
								value={task.owner ? task.owner._id : ''}>
								<option value=''></option>
								{users.map((user, idx) => {
									return (
										<option key={user._id} value={user._id}>
											{user.firstName}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<label htmlFor='description'>Description</label>
					<textarea
						type='text'
						id='description'
						onChange={handleChange}
						placeholder='Task Description'
						value={task.description}
					/>
					<div className='task-comments-wrapper'>
						Comments
						<div className='task-comments-list'>
							{task.comments.map((comment, idx) => {
								formatTime(comment.time);
								return (
									<div className='task-comment' key={idx}>
										<div className='task-comment-header'>
											<span className='task-comment-user'>
												{comment.user.firstName}
											</span>
											<span className='task-comment-time'>
												{formatTime(comment.time)}
											</span>
										</div>
										<div className='task-comment-content'>
											{comment.content}
										</div>
									</div>
								);
							})}
						</div>
						<div className='task-new-comment-wrapper'>
							<button
								className='task-comment-button task-button'
								disabled={commentIsValidated() ? false : true}
								type='button'
								onClick={handleComment}>
								Add comment
							</button>
							<input
								type='text'
								id='new_comment'
								placeholder='New comment here'
								value={newComment}
								onChange={(ev) => {
									setNewComment(ev.target.value);
								}}></input>
						</div>
					</div>
					<div className='task-bottom-buttons'>
						<button
							className='task-button'
							disabled={!titleIsValidated() || !currentUser}
							type='button'
							onClick={handleTaskSubmit}>
							{newTask ? 'Save' : 'Update'}
						</button>
						{!newTask && (
							<button
								type='button'
								className='task-button'
								disabled={!currentUser}
								onClick={handleDeleteTask}>
								Delete
							</button>
						)}
						<button
							type='button'
							className='task-button'
							onClick={(ev) => {
								navigate('/');
							}}>
							Cancel
						</button>
					</div>
					{!currentUser && (
						<p className='task-login-message'>
							To add a new task, or update existing one, please{' '}
							<button
								className='task-login-link'
								onClick={() => navigate('/login')}>
								login
							</button>
						</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default TaskDetails;

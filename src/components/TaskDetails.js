import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
// Bring in CSS style
import '../styles/TaskDetails.css';

// import data from '../tasks.json';
function TaskDetails(props) {
	const { params } = useMatch('/task/:id');
	const id = params.id;
	const newTask = id === 'new' ? true : false;

	const navigate = useNavigate();

	// API url
	// const baseUrl = 'http://localhost:3111/tasks';
	const baseUrl = 'https://arcane-plateau-58687.herokuapp.com';

	// temporary array of users
	// let users = ['Kurt', 'Oscar', 'Elad'];
	const [users, setUsers] = useState([]);
	const priorities = ['High', 'Medium', 'Low'];
	const currentUser = {
		_id: '61f1b20c74641d982a713f1a',
		username: 'es',
		firstName: 'Elad',
		lastName: 'Sadeh',
		image: null,
	};

	// Initialize Task state
	const initialTask = {
		title: '',
		description: '',
		stage: 'To Do',
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
	const [task, setTask] = useState(initialTask); // Task object
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [loadingSettings, setLoadingSettings] = useState(true);
	const [showDeleteModal, setDeleteModal] = useState(false); // show modal before delete

	// When component mount, fetch task details IF id is not 'new'
	useEffect(() => {
		setLoadingUsers(true);
		setLoadingSettings(true);

		// Get all users from database
		axios
			.get(`${baseUrl}/users`)
			.then((res) => {
				console.log('users:', res.data);
				setUsers(res.data);
				// console.log('loadingUsers=', loadingUsers);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoadingUsers(false);
				// console.log('loadingUsers=', loadingUsers);
			});

		// Get stages from settings
		axios
			.get(`${baseUrl}/settings`)
			.then((res) => {
				console.log('loadingSettings =', loadingSettings);
				console.log('stages:', res.data[0].stages);
				setStages(res.data[0].stages);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setTask({ ...initialTask, stage: stages[0] });
				setLoadingSettings(false);
				console.log('loadingSettings =', loadingSettings);
			});

		// IF its not a new task get the task from database ELSE intialize to defaults
		if (!newTask) {
			console.log('fetching task details', id);
			getTaskDetails(`${baseUrl}/tasks/${id}`);
		} else {
			console.log('adding new task:', task);
		}
	}, [id]);

	// API operations functions
	// Get Task details based on id for existing task (edit)
	async function getTaskDetails(url) {
		const res = await fetch(url);
		const data = await res.json();
		console.log('fetch data:', data);
		setTask(data);
	}

	// POST a new task
	function postTask(url) {
		console.log('post a new task:', task);
		axios.post(url, task).then((res) => {
			console.log('post results:', res);
		});
		// Go to main view after posting a new task
		navigate('/');
	}

	// UPDATE a task
	function updateTask(url) {
		console.log('update task:', task);
		axios.put(url, task).then((res) => {
			console.log('put results:', res);
		});
		// Go to main view after updating a task
		navigate('/');
	}

	// DELETE a task
	function deleteTask(url) {
		console.log('delete:', url);
		axios.delete(url).then((res) => {
			console.log('delete results:', res);
		});
		// Go to main view after deleting a task
		navigate('/');
	}

	// ------ Helper Functions ---------------------
	function titleIsValidated() {
		// console.log('title validation', /[a-z]/i.test(task.title));
		return /[a-z]/i.test(task.title) ? true : false;
	}
	function commentIsValidated() {
		// console.log('title validation', /[a-z]/i.test(task.title));
		return /[a-z]/i.test(newComment) ? true : false;
	}

	function formatTime(time) {
		// console.log(time);
		// const now = new Date();
		const commentTime = new Date(time);
		// const nowday = String(now).match(/(([a-z]+) ([a-z]+) (\d+))/i)[0];
		// const nowtime = String(now).match(/(\d\d:\d\d)/)[0];
		// console.log(nowday, nowtime);
		const day = String(commentTime).match(/(([a-z]+) ([a-z]+) (\d+))/i)[0];
		const hour = String(commentTime).match(/(\d\d:\d\d)/)[0];
		// console.log(`${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
		return `${day} ${hour}`;
		// console.log(new Date(time));
	}

	function confirmDelete(confirm) {
		setDeleteModal(false);
		console.log('delete task?', confirm);
		// Delete task if confirmed
		confirm && deleteTask(`${baseUrl}/tasks/${id}`);
	}

	// ------------ Handle Events ---------------
	function handleDeleteTask(ev) {
		ev.preventDefault();
		// Open a model to get confirmation
		setDeleteModal(true);
		// Add verifiction (do you really want to delete ?)
		// let allowDelete = confirmDelete(task);
		// console.log('allow:', allowDelete);
	}

	function handleComment(ev) {
		// console.log(ev);
		ev.preventDefault();
		// console.log(ev.target.id, ev.target.value);
		// console.log('handleComment: ' + newComment +"'");
		const tmpTask = task;
		const timeStamp = new Date().toISOString();
		tmpTask.comments.push({
			user: currentUser,
			time: timeStamp,
			content: newComment,
		});
		// console.log(tmpTask);
		setTask(tmpTask);
		setNewComment('');
	}

	function handleChange(ev) {
		// console.log('handle task details form');
		// console.log('handleChange:',ev.target.id, ev.target.value);
		setTask({ ...task, [ev.target.id]: ev.target.value });
		// console.log(task);
	}

	function handleTaskSubmit(ev) {
		ev.preventDefault();
		console.log('new/update:', task);
		// Task object validation
		if (!task.stage) {
			console.log('task has no stage setting to', stages[0]);
			task.stage = stages[0];
		}
		console.log(task.owner);
		if (!task.owner) task.owner = null;
		console.log(task.owner);
		// if (!/[a-z]/i.test(task.title)) {
		// 	console.log('Task must have a title');
		// 	return null;
		// }
		console.log(task);
		if (newTask) {
			console.log('creating new task', task);
			postTask(`${baseUrl}/tasks`);
		} else {
			console.log('updating task', id);
			updateTask(`${baseUrl}/tasks/${id}`);
		}
	}
	// console.log('stages', task.stage);
	// console.log(!task.stage || !task);
	if (!task) return <div>Loading...</div>;
	// console.log('rendering:', task);
	return (
		<div>
			{showDeleteModal && (
				<div className='delete-confirm-wrapper'>
          <div className='delete-confirm-modal'>
            <div>Are you sure you want to delete <br/>"{task.title}"?</div>
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
						<select id='priority' onChange={handleChange} value={task.priority}>
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
									<div className='task-comment-content'>{comment.content}</div>
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
						disabled={titleIsValidated() ? false : true}
						type='button'
						onClick={handleTaskSubmit}>
						{newTask ? 'Save' : 'Update'}
					</button>
					{!newTask && (
						<button
							type='button'
							className='task-button'
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
			</form>
		</div>
	);
}

export default TaskDetails;

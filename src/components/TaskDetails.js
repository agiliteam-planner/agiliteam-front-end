import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
// Bring in CSS style
import '../styles/TaskDetails.css';

import data from '../tasks.json';

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
	const priorities = ['high', 'medium', 'low'];
	const currentUser = {
		_id: '61f1b20c74641d982a713f1a',
		username: 'es',
		firstName: 'Elad',
		lastName: 'Sadeh',
		image: null,
	};

	// New comment state
	let [newComment, setNewComment] = useState('');

	// Initialize Task state
	const initialTask = {
		title: '',
		description: '',
		stage: 'Todo',
		priority: '',
		checklist: [],
		dueDate: new Date().toISOString().slice(0, 10),
		files: [],
		comments: [],
		owner: '',
	};

	const [task, setTask] = useState(initialTask);
	// When component mount, fetch task details IF id is not 'new"
	useEffect(() => {
		axios.get(`${baseUrl}/users`).then((res) => {
			console.log('users:', res.data);
			setUsers(res.data);
		});
		if (!newTask) {
			console.log('fetching task details', id);
			getTaskDetails(`${baseUrl}/tasks/${id}`);
		} else {
			setTask(initialTask);
			console.log('adding new task');
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
		// navigate('/');
	}

	// POST a new task
	function updateTask(url) {
		console.log('update task:', task);
		axios.put(url, task).then((res) => {
			console.log('put results:', res);
		});
		// Go to main view after updating a task
		// navigate('/');
	}

	// DELETE a task
	function deleteTask(url) {
		console.log('delete:', url);
		axios.delete(url).then((res) => {
			console.log('delete results:', res);
		});
		// Go to main view after deleting a task
		navigate('/task/new');
	}

	// ---------------------------------------------

	function handleDeleteTask(ev) {
		ev.preventDefault();
		console.log('delete task');
		console.log(id);
		// Add verifiction (do you really want to delete ?)
		deleteTask(`${baseUrl}/tasks/${id}`);
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
		console.log(tmpTask);
		setTask(tmpTask);
		setNewComment('');
	}

	function handleChange(ev) {
		// console.log('handle task details form');
		console.log(ev.target.id, ev.target.value);
		setTask({ ...task, [ev.target.id]: ev.target.value });

		console.log(task);
	}

	function handleTaskSubmit(ev) {
		ev.preventDefault();
		console.log('submit');
		if (newTask) {
			console.log('creating new task', task);
			postTask(`${baseUrl}/tasks`);
		} else {
			console.log('updating task', id);
			updateTask(`${baseUrl}/tasks/${id}`);
		}
	}

	if (!task) return null;
	return (
		<div>
			<form id='task-details-form'>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					id='title'
					onChange={handleChange}
					placeholder='Task Title'
					value={task.title}
				/>
				<label htmlFor='description'>Description</label>
				<textarea
					type='text'
					id='description'
					onChange={handleChange}
					placeholder='Task Description'
					value={task.description}
				/>
				<label htmlFor='dueDate'>Due Date</label>
				<input
					type='date'
					id='dueDate'
					onChange={handleChange}
					placeholder='Task Description'
					value={task.dueDate.slice(0, 10)}
				/>
				<label htmlFor='priority'>Priority</label>
				<select id='priority' onChange={handleChange} value={task.priority}>
					<option value={null}></option>
					{priorities.map((priority, idx) => {
						return (
							<option key={idx} value={idx}>
								{priority}
							</option>
						);
					})}
				</select>
				<label htmlFor='owner'>Owner</label>
				<select id='owner' onChange={handleChange} value={task.owner._id}>
					<option value=''></option>
					{users.map((user, idx) => {
						return (
							<option key={user._id} value={user._id}>
								{user.firstName}
							</option>
						);
					})}
				</select>
				<div className='task-comments'>
					Comments
					<div className='task-comments-list'>
						{task.comments.map((comment, idx) => {
							return (
								<div key={idx}>
									{comment.user.firstName}: {comment.content} @
									{comment.time.slice(0, 10)}
								</div>
							);
						})}
					</div>
					<button onClick={handleComment}>Add comment</button>
					<input
						type='text'
						id='new_comment'
						value={newComment}
						onChange={(ev) => setNewComment(ev.target.value)}></input>
				</div>
				<button onClick={handleTaskSubmit}>Submit</button>
				<button onClick={handleDeleteTask}>Delete</button>
			</form>
		</div>
	);
}

export default TaskDetails;

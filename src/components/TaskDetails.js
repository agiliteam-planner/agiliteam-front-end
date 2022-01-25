import React, { useState } from 'react';
import { Link, useParams, useMatch } from 'react-router-dom';
import data from '../tasks.json';

function TaskDetails(props) {
	const { params } = useMatch('/task/:id');
	// console.log(data);

	// temporary array of users
	const users = ['Kurt', 'Oscar', 'Elad'];

	const initialTaskState = {
		title: 'New title',
		description: 'Some more details',
		stage: 'Todo',
		priority: 1,
		checklist: [{ title: 'first checklist', checked: false }],
		duedate: new Date().toISOString().slice(0, 10),
		files: [],
		comments: [
			{
				user: 'Elad',
				content: 'I think we should do that',
				time: '2022-01-24',
			},
			{
				user: 'Oscar',
				content: 'Or, we can do something else',
				time: '2022-01-24',
			},
			{ user: 'Kurt', content: 'Ok. I agree', time: '2022-01-25' },
		],
		owner: 'Elad',
	};

	const [taskState, setTaskState] = useState(initialTaskState);
	console.log(taskState);

	function handleChange(ev) {
		// console.log('handle task details form');
		setTaskState({ ...taskState, [ev.target.id]: ev.target.value });
	}

	return (
		<div>
			<form className='task-details-form'>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					id='title'
					onChange={handleChange}
					placeholder='Task Title'
					value={taskState.title}
				/>
				<label htmlFor='description'>Description</label>
				<textarea
					type='text'
					id='description'
					onChange={handleChange}
					placeholder='Task Description'
					value={taskState.description}
				/>
				<label htmlFor='duedate'>Due Date</label>
				<input
					type='date'
					id='duedate'
					onChange={handleChange}
					placeholder='Task Description'
					value={taskState.duedate}
				/>
				<label htmlFor='priority'>Priority</label>
				<input
					type='number'
					min='1'
					id='priority'
					onChange={handleChange}
					placeholder='Task Description'
					value={taskState.priority}
				/>
				<label htmlFor='owner'>Owner</label>
				<select
					type='number'
					min='1'
					id='owner'
					onChange={handleChange}
					value={taskState.owner}>
					{users.map((user, idx) => {
						return (
							<option key={idx} value={user}>
								{user}
							</option>
						);
					})}
				</select>
				<div className='task-comments'>
					Comments
					<div className='task-comments-list'>
						{taskState.comments.map((comment, idx) => {
							return (
								<div key={idx}>
									{comment.user}: {comment.content} @{comment.time}
								</div>
							);
						})}
					</div>
					<button>Add comment</button>
				</div>
			</form>
		</div>
	);
}

export default TaskDetails;

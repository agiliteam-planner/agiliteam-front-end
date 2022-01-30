import { useNavigate } from 'react-router-dom';

import '../styles/TaskCard.css';

function TaskCard({ task }) {
	const navigate = useNavigate();

	// TODO: Load these values from settings?
	// const priorities = ['high', 'medium', 'low']; // in db settings
	const priorities = [
		{ icon: '❗️', string: 'High' },
		{ icon: '', string: 'Medium' },
		{ icon: '⬇', string: 'Low' },
	];

	// Navigate to task details
	function handleClick() {
		navigate(`/task/${task._id}`);
	}

	return (
		<div className='task-card card-style' onClick={handleClick}>
			<p className='task-title'>{task.title}</p>
			{/* TODO: Refactor to show avatar or initials when owner is populated in tasks */}
			{task.owner && (
				<p
					className='task-owner'
					title={`Owner: ${task.owner.firstName} ${task.owner.lastName}`}>
					{(
						task.owner.firstName.charAt(0) + task.owner.lastName.charAt(0)
					).toUpperCase()}
				</p>
			)}
			<p
				className='task-priority'
				title={priorities[task.priority ?? 1].string + ' priority'}>
				{priorities[task.priority ?? 1].icon}
			</p>
			<p className='task-date' title='Due date'>
				{task.dueDate &&
					new Date(task.dueDate).toLocaleString('en-US', {
						dateStyle: 'short',
					})}
			</p>
		</div>
	);
}

export default TaskCard;

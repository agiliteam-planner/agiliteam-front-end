import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Stage from './Stage';

import '../styles/Stages.css';

function Stages(props) {

	// Initial values while loading tasks from API
	const placeholderTask = { title: 'Loading...' };
	const placeholderStages = ['To Do', 'In Progress', 'In Review', 'Done'];
	const placeholderStagedTasks = [
		{ name: 'To Do', tasks: [placeholderTask] },
		{ name: 'In Progress', tasks: [placeholderTask] },
		{ name: 'In Review', tasks: [placeholderTask] },
		{ name: 'Done', tasks: [placeholderTask] },
	];

	// State for stages and tasks
	const [users, setUsers] = useState([]);
	const [stages, setStages] = useState(placeholderStages);
	const [stagedTasks, setStagedTasks] = useState(placeholderStagedTasks);

	// Sort tasks from API into appropriate stage
	// And grab only users that appear in those tasks
	function refreshTasks(tasks) {
		const newStagedTasks = stages.map((stage) => {
			const stageTasks = tasks.filter((task) => task.stage === stage);
			return { name: stage, tasks: stageTasks };
		});

		// Keep only truthy owners present in tasks
		let newUsers = tasks.filter((task) => task.owner);
		// Keep only unique owners
		// https://stackoverflow.com/a/58429784/1074802
		newUsers = [
			...new Map(newUsers.map((task) => [task.owner._id, task.owner])).values(),
		];
		// And sort users alphabetically
		newUsers.sort((a, b) =>
			a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
		);

		// Set states
		setUsers(newUsers);
		setStagedTasks(newStagedTasks);
	}

	// On initial mount
	useEffect(() => {
		// TODO: Move url to a settings location or env variable?
		const backendUrl = 'https://arcane-plateau-58687.herokuapp.com';

		// IIFE to make it async
		(async () => {
			try {
				const stagesResponse = await axios.get(`${backendUrl}/settings`);
				setStages(stagesResponse.data[0].stages);

				const tasksResponse = await axios.get(`${backendUrl}/tasks`);
				refreshTasks(tasksResponse.data);
			} catch (error) {
				// TODO: Handle errors for user
				console.error(error);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const priorities = [
		{ icon: '❗️', string: 'High' },
		{ icon: '', string: 'Medium' },
		{ icon: '⬇', string: 'Low' },
	];
	function sortByPriority(e) {
		let sortedTasks = [];
		stagedTasks.forEach((element) => {sortedTasks.push(element.tasks)})
		console.log(sortedTasks);
	};

	return (
		<>
			<div className='stages-heading'>
				<Link className='new-task' to='/task/new'>
					New Task
				</Link>

				<ul className='stages-options'>
					{/* Each filter adds search params? to be bookmarkable */}
					<li>Show Cards by Priority:</li>
					<li>
						<select onChange={(e) => sortByPriority(e.target.value)} htmlFor='prioritySorting'>
							<option value=''>Priority</option>
							<option value='0'>❗️ High</option>
							<option value='1'>Medium</option>
							<option value='2'>⬇ Low</option>
						</select>
					</li>
					<li>
						<button>Due Date △</button>
					</li>
					<li>
						<label htmlFor='filter-user'>Filter: </label>
						<select name='filter-user' id='filter-user' defaultValue={null}>
							<option value={null}></option>
							{users.map((user) => (
								<option key={user._id} value={user._id}>
									{`${user.firstName} ${user.lastName.charAt(0)}.`}
								</option>
							))}
						</select>
					</li>
				</ul>
			</div>
			<div className='stages-container'>
				{stagedTasks.map((stage, i) => (
					<Stage key={i} stage={stage} />
				))}
			</div>
		</>
	);
}

export default Stages;

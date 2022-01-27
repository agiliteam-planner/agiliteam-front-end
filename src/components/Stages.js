import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Stage from './Stage';

import '../styles/Stages.css';

const tempTasks = [
	{
		_id: '61f1b20b74641d982a713f11',
		title: 'Create Task Schema',
		description: 'Prepare Task Schema based on project proposal definition',
		stage: 'In Review',
		dueDate: '2022-01-25T15:12:52.000Z',
		priority: 2,
		owner: null,
		checklist: [null],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: 'Almost done',
				time: '2022-01-25T14:12:52.000Z',
				_id: '61f1b20b74641d982a713f12',
			},
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: 'Ready for review',
				time: '2022-01-27T02:43:54.612Z',
				_id: '61f206ecdaedc1d26f4a8dba',
			},
		],
		files: ['Task.js'],
		__v: 0,
	},
	{
		_id: '61f1b20b74641d982a713f13',
		title: 'Main view React component',
		description: 'Build the stages view in React',
		stage: 'In Progress',
		dueDate: '2022-01-27T00:00:00.000Z',
		priority: 1,
		owner: {
			_id: '61f1b20c74641d982a713f1b',
			username: 'os',
			firstName: 'Oscar',
			lastName: 'Sanchez',
			image: 'giphy.gif',
			__v: 0,
		},
		checklist: [
			{
				title: 'Render stages',
				checked: true,
				_id: '61f1b20b74641d982a713f14',
			},
		],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f1b',
					username: 'os',
					firstName: 'Oscar',
					lastName: 'Sanchez',
					image: 'giphy.gif',
					__v: 0,
				},
				content: 'On it',
				time: '2022-01-25T14:12:52.000Z',
				_id: '61f1b20b74641d982a713f15',
			},
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: 'This is a test comment',
				time: '2022-01-27T01:29:29.774Z',
				_id: '61f1f57ddaedc1d26f4a8c54',
			},
		],
		files: ['Stages.js'],
		__v: 0,
	},
	{
		_id: '61f1b20b74641d982a713f0e',
		title: 'Make wireframes',
		description: 'Testing update task',
		stage: 'Done',
		dueDate: '2022-01-27T00:00:00.000Z',
		priority: 0,
		owner: {
			_id: '61f1b20c74641d982a713f1b',
			username: 'os',
			firstName: 'Oscar',
			lastName: 'Sanchez',
			image: 'giphy.gif',
			__v: 0,
		},
		checklist: [
			{
				title: 'Main View',
				checked: false,
				_id: '61f1b20b74641d982a713f0f',
			},
		],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f19',
					username: 'ks42',
					firstName: 'Kurt',
					lastName: 'Shields',
					image: 'best image location',
					__v: 0,
				},
				content: 'lets do it',
				time: '2022-01-24T14:12:52.000Z',
				_id: '61f1b20b74641d982a713f10',
			},
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: 'This is a test comment',
				time: '2022-01-27T00:16:24.446Z',
				_id: '61f1e461daedc1d26f4a86aa',
			},
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: 'Hello comment',
				time: '2022-01-27T00:19:20.964Z',
				_id: '61f1e51ddaedc1d26f4a86e0',
			},
		],
		files: ['planning.md'],
		__v: 0,
	},
	{
		_id: '61f1d554851f0db241399d8d',
		title: 'Test Associations',
		description: 'Test the relationship between Task model and User model',
		stage: 'Done',
		dueDate: '2022-01-25T15:12:52.000Z',
		priority: 1,
		owner: {
			_id: '61f1b20c74641d982a713f19',
			username: 'ks42',
			firstName: 'Kurt',
			lastName: 'Shields',
			image: 'best image location',
			__v: 0,
		},
		checklist: [
			{
				title: 'Main View',
				checked: false,
				_id: '61f1b20b74641d982a713f0f',
			},
		],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f19',
					username: 'ks42',
					firstName: 'Kurt',
					lastName: 'Shields',
					image: 'best image location',
					__v: 0,
				},
				content: 'lets do it',
				time: '2022-01-24T14:12:52.000Z',
				_id: '61f1b20b74641d982a713f10',
			},
		],
		files: ['planning.md'],
		__v: 0,
	},
	{
		_id: '61f1d591851f0db241399d9b',
		title: 'Test Associations 2',
		description:
			'Test the relationship between Task model and User model using just the ID',
		stage: 'In Review',
		dueDate: '2022-01-25T15:12:52.000Z',
		priority: 1,
		owner: {
			_id: '61f1b20c74641d982a713f19',
			username: 'ks42',
			firstName: 'Kurt',
			lastName: 'Shields',
			image: 'best image location',
			__v: 0,
		},
		checklist: [
			{
				title: 'Main View',
				checked: false,
				_id: '61f1b20b74641d982a713f0f',
			},
		],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f19',
					username: 'ks42',
					firstName: 'Kurt',
					lastName: 'Shields',
					image: 'best image location',
					__v: 0,
				},
				content: 'lets do it',
				time: '2022-01-24T14:12:52.000Z',
				_id: '61f1b20b74641d982a713f10',
			},
		],
		files: ['planning.md'],
		__v: 0,
	},
	{
		_id: '61f1f5e4daedc1d26f4a8c79',
		title: 'Create new task',
		description: 'This is the new task description',
		stage: 'In Progress',
		dueDate: '2022-01-30T00:00:00.000Z',
		priority: 1,
		owner: {
			_id: '61f1b20c74641d982a713f1a',
			username: 'es',
			firstName: 'Elad',
			lastName: 'Sadeh',
			image: null,
			__v: 0,
		},
		checklist: [],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: 'Hello comment',
				time: '2022-01-27T01:31:10.735Z',
				_id: '61f1f5e4daedc1d26f4a8c7a',
			},
		],
		files: [],
		__v: 0,
	},
	{
		_id: '61f20840daedc1d26f4a8e99',
		owner: {
			_id: '61f1b20c74641d982a713f1a',
			username: 'es',
			firstName: 'Elad',
			lastName: 'Sadeh',
			image: null,
			__v: 0,
		},
		files: [],
		checklist: [],
		comments: [],
	},
	{
		_id: '61f2bff56788b5e6bfdc671d',
		title: 'Testing Create',
		description: 'Testing create',
		stage: 'Todo',
		dueDate: '2022-01-27T00:00:00.000Z',
		priority: 1,
		owner: {
			_id: '61f1b20c74641d982a713f19',
			username: 'ks42',
			firstName: 'Kurt',
			lastName: 'Shields',
			image: 'best image location',
			__v: 0,
		},
		checklist: [],
		comments: [],
		files: [],
		__v: 0,
	},
	{
		_id: '61f2c23d6788b5e6bfdc684d',
		title: 'Test create 2',
		description: 'test create 2',
		stage: 'Todo',
		dueDate: '2022-01-27T00:00:00.000Z',
		priority: 0,
		owner: {
			_id: '61f1b20c74641d982a713f19',
			username: 'ks42',
			firstName: 'Kurt',
			lastName: 'Shields',
			image: 'best image location',
			__v: 0,
		},
		checklist: [],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: 'test comment',
				time: '2022-01-27T16:03:08.505Z',
				_id: '61f2c23d6788b5e6bfdc684e',
			},
		],
		files: [],
		__v: 0,
	},
	{
		_id: '61f2c2886788b5e6bfdc68ce',
		title: 'test',
		description: 'test',
		stage: 'Todo',
		dueDate: '2022-01-27T00:00:00.000Z',
		priority: 0,
		owner: {
			_id: '61f1b20c74641d982a713f19',
			username: 'ks42',
			firstName: 'Kurt',
			lastName: 'Shields',
			image: 'best image location',
			__v: 0,
		},
		checklist: [],
		comments: [
			{
				user: {
					_id: '61f1b20c74641d982a713f1a',
					username: 'es',
					firstName: 'Elad',
					lastName: 'Sadeh',
					image: null,
					__v: 0,
				},
				content: '123',
				time: '2022-01-27T16:04:23.671Z',
				_id: '61f2c2886788b5e6bfdc68cf',
			},
		],
		files: [],
		__v: 0,
	},
	{
		_id: '61f2d1b223fb49a69a1c3e02',
		title: 'Testing comments bug',
		description: 'What happens when I press Enter??',
		stage: 'Todo',
		dueDate: '2022-01-27T00:00:00.000Z',
		priority: 1,
		owner: {
			_id: '61f1b20c74641d982a713f1a',
			username: 'es',
			firstName: 'Elad',
			lastName: 'Sadeh',
			image: null,
			__v: 0,
		},
		checklist: [],
		comments: [],
		files: [],
		__v: 0,
	},
];

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

				// TEMP hard coded data
				const tasksResponse = { data: tempTasks };
				// const tasksResponse = await axios.get(`${backendUrl}/tasks`);
				refreshTasks(tasksResponse.data);
			} catch (error) {
				// TODO: Handle errors for user
				console.error(error);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className='stages-heading'>
				<Link className='new-task' to='/task/new'>
					New Task
				</Link>

				<ul className='stages-options'>
					{/* Each filter adds search params? to be bookmarkable */}
					<li>Sort:</li>
					<li>
						<button>Priority ▽</button>
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
									{`${user.firstName} ${user.lastName}`}
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

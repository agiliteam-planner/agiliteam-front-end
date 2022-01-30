import TaskCard from './TaskCard';

import '../styles/Stage.css';

function Stage({ stage }) {
	return (
		<div className='stage panel-style'>
			<div className='stage-name'>
				<h3>{stage.name}</h3>
			</div>
			{stage.tasks.map((task, i) =>
				task._id ? <TaskCard key={task._id} task={task} /> : task.title
			)}
		</div>
	);
}

export default Stage;

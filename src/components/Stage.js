import TaskCard from './TaskCard';

import '../styles/Stage.css';

function Stage({ stage }) {
	return (
		<div className='stage'>
			<h3 className='stage-name'>{stage.name}</h3>
			{stage.tasks.map((task, i) =>
				task._id ? <TaskCard key={task._id} task={task} /> : task.title
			)}
			{/* <div className='stage-footer'></div> */}
		</div>
	);
}

export default Stage;

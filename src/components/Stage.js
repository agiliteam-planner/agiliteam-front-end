import TaskCard from './TaskCard';

import '../styles/Stage.css';

function Stage({ stage }) {
	return (
		<div className='stage'>
			<h3 className='stage-title'>{stage.name}</h3>
			{/* <div className='task-list'> */}
			{stage.tasks.map((task, i) =>
				task._id ? <TaskCard key={task._id} task={task} /> : task.title
			)}
			{/* </div> */}
		</div>
	);
}

export default Stage;

import TaskCard from './TaskCard';

import '../styles/Stage.css';

function Stage({ stage, id }) {
	// Temp colors for stages (To be included in custom stage definition)
	const stageColor = [
		'#9FA8DA',
		'#B0BEC5',
		'#80CBC4',
		'#BCAAA4',
		'#B39DDB',
		'#FFCC80',
	];

	return (
		<div
			className='stage panel-style'
			style={{
				backgroundColor: stageColor[id],
				borderBottomColor: stageColor[id],
			}}>
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

import TaskCard from './TaskCard';

import '../styles/Stage.css';

function Stage({ stage }) {
  return (
    <div className='stage'>
      <h3>{stage.name}</h3>
      {stage.tasks.map((task, i) =>
        task._id ? <TaskCard key={task._id} task={task} /> : task.title
      )}
    </div>
  );
}

export default Stage;

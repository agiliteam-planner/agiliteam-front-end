import { Route, Link } from 'react-router-dom';

import TaskCard from './TaskCard';

function Stage({ stage }) {
  return (
    <div className='stage'>
      <div>{stage.name}</div>
      {stage.tasks.map((task, i) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default Stage;

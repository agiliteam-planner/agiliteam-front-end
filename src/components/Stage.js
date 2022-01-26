import { Route, Link } from 'react-router-dom';

import TaskCard from './TaskCard';

import '../styles/Stage.css';

function Stage({ stage }) {
  return (
    <div className='stage'>
      <h3>{stage.name}</h3>
      {stage.tasks.map((task, i) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default Stage;

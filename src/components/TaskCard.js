import { Route, Link } from 'react-router-dom';

import '../styles/TaskCard.css';

function TaskCard({ task }) {
  return (
    <div className='task-card'>
      <p>{task.title}</p>
      <Link to={`/task/${task._id}`} />
    </div>
  );
}

export default TaskCard;

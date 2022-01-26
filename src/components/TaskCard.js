import { Route, Link } from 'react-router-dom';

import '../styles/TaskCard.css';

function TaskCard({ task }) {
  return (
    <div className='task-card'>
      <p className='task-title'>{task.title}</p>
      {/* TODO: Refactor to show avatar or initials when owner is populated in tasks */}
      <p className='task-owner'>{task.owner}</p>
      <p className='task-priority'>{task.priority}</p>
      <p className='task-date'>
        {new Date(task.dueDate).toLocaleString('en-US', { dateStyle: 'short' })}
      </p>
      <Link className='task-more' to={`/task/${task._id}`}>
        More
      </Link>
    </div>
  );
}

export default TaskCard;

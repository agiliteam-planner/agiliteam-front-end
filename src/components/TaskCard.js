import { useNavigate } from 'react-router-dom';

import '../styles/TaskCard.css';

function TaskCard({ task }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/task/${task._id}`);
  }

  return (
    <div className='task-card' onClick={handleClick}>
      <p className='task-title'>{task.title}</p>
      {/* TODO: Refactor to show avatar or initials when owner is populated in tasks */}
      <p className='task-owner'>{task.owner}</p>
      <p className='task-priority'>{task.priority}</p>
      <p className='task-date'>
        {new Date(task.dueDate).toLocaleString('en-US', { dateStyle: 'short' })}
      </p>
    </div>
  );
}

export default TaskCard;

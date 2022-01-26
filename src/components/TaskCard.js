import { useNavigate } from 'react-router-dom';

import '../styles/TaskCard.css';

function TaskCard({ task }) {
  const navigate = useNavigate();

  // TEMP values to test display
  if (typeof task.owner === 'string') {
    task.owner = {
      _id: '61f1a98a1176f7e63c741284',
      username: 'ks42',
      firstName: 'Kurt',
      lastName: 'Shields',
      image: 'best image location',
      __v: 0,
    };
  } // TODO: Delete this temp object

  // TODO: Load these values from settings
  // const priorities = ['high', 'medium', 'low'];
  const priorities = [
    { icon: '❗️', string: 'High' },
    { icon: '', string: 'Medium' },
    { icon: '⬇', string: 'Low' },
  ];

  // Navigate to task details
  function handleClick() {
    navigate(`/task/${task._id}`);
  }

  return (
    <div className='task-card' onClick={handleClick}>
      <p className='task-title'>{task.title}</p>
      {/* TODO: Refactor to show avatar or initials when owner is populated in tasks */}
      <p
        className='task-owner'
        title={`Owner: ${task.owner.firstName} ${task.owner.lastName}`}>
        {(
          task.owner.firstName.charAt(0) + task.owner.lastName.charAt(0)
        ).toUpperCase()}
      </p>
      <p
        className='task-priority'
        title={priorities[task.priority].string + ' priority'}>
        {priorities[task.priority].icon}
      </p>
      <p className='task-date' title='Due date'>
        {new Date(task.dueDate).toLocaleString('en-US', { dateStyle: 'short' })}
      </p>
    </div>
  );
}

export default TaskCard;

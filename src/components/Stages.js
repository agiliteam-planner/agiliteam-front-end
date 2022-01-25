import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Stage from './Stage';

import '../styles/Stages.css';

function Stages(props) {
  // TEMP: Hard coded stages and tasks while building UI
  const tempTasks = [
    {
      _id: 'abc',
      _idtitle: 'Make wireframes',
      description: 'Prepare wireframe for each view',
      stage: 'Todo',
      dueDate: 'Tue Jan 25 2022 10:12:52 GMT-0500',
      priority: 2,
      owner: 'eladsadeh',
      checklist: [{ title: 'Main View', checked: false }],
      comments: [
        {
          user: 'kurt',
          content: 'lets do it',
          time: 'Mon Jan 24 2022 9:12:52 GMT-0500',
        },
      ],
      files: ['planning.md'],
    },
    {
      _id: 'def',
      title: 'Create Task Schema',
      description: 'Prepare Task Schema based on project proposal definition',
      stage: 'In Progress',
      dueDate: 'Tue Jan 25 2022 10:12:52 GMT-0500',
      priority: 2,
      owner: 'kurt',
      checklist: [null],
      comments: [
        {
          user: 'kurt',
          content: 'Almost done',
          time: 'Tue Jan 25 2022 9:12:52 GMT-0500',
        },
      ],
      files: ['Task.js'],
    },
    {
      _id: 'ghi',
      title: 'Main view React component',
      description: 'Build the stages view in React',
      stage: 'In Progress',
      dueDate: 'Wed Jan 26 2022 18:00:00 GMT-0500',
      priority: 2,
      owner: 'oscar',
      checklist: [{ title: 'Render stages', checked: true }],
      comments: [
        {
          user: 'Oscar',
          content: 'On it',
          time: 'Tue Jan 25 2022 9:12:52 GMT-0500',
        },
      ],
      files: ['Stages.js'],
    },
  ];
  const tempInit = [
    { name: 'To Do', tasks: tempTasks },
    { name: 'In Progress', tasks: tempTasks },
    { name: 'In Review', tasks: tempTasks },
    { name: 'Done', tasks: tempTasks },
  ];

  // State for stages and tasks
  const [stages, setStages] = useState(tempInit);

  // On initial mount
  useEffect(() => {}, []);

  return (
    <main>
      <div>
<<<<<<< HEAD
        <Link to='/task/new'>New Task</Link>
=======
        <Link to='task/new'>New Task</Link>
>>>>>>> dbf0292 (Render basic Stages, Stage and TaskCard)
        <ul>
          {/* Each filter adds search params? to be bookmarkable */}
          <li>
            <button>Filter</button>
          </li>
          <li>
            <button>Filter</button>
          </li>
          <li>
            <button>Filter</button>
          </li>
          {/* <li>
            <label htmlFor="sort">Sort: </label>
            <select name="sort" id="sort">
              <option value="priority">Priority</option>
              <option value="due-date">Due Date</option>
            </select>
          </li> */}
        </ul>
      </div>
      <div className='stages-container'>
        {stages.map((stage, i) => (
          <Stage key={i} stage={stage} />
        ))}
      </div>
    </main>
  );
}

export default Stages;

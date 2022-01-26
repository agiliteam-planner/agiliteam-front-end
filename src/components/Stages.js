import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Stage from './Stage';

import '../styles/Stages.css';

function Stages(props) {
  // TEMP: Hard coded tasks while building UI
  const tempTasks = [
    {
      _id: 'abc',
      title: 'Dummy task 1',
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
      title: 'Dummy task 2',
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
      title: 'Dummy task 3',
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

  // Hardcoded stages to show all stages even if empty
  const stages = [
    { name: 'Todo', tasks: tempTasks },
    { name: 'In Progress', tasks: tempTasks },
    { name: 'In Review', tasks: tempTasks },
    { name: 'Done', tasks: tempTasks },
  ];

  // State for stages and their tasks
  const [stagedTasks, setStagedTasks] = useState(stages);

  // Sorts all tasks from API request into each stage
  function updateTasks(tasks) {
    const newStagedTasks = stages.map((stage) => {
      const stageTasks = tasks.filter((task) => task.stage === stage.name);
      return { name: stage.name, tasks: stageTasks };
    });
    setStagedTasks(newStagedTasks);
  }

  // On initial mount
  useEffect(() => {
    // TODO: Move url to a settings location or env variable?
    const backendUrl = 'https://arcane-plateau-58687.herokuapp.com';

    // IIFE to make it async
    (async () => {
      try {
        const response = await fetch(backendUrl + '/tasks');
        const tasks = await response.json();
        updateTasks(tasks);
      } catch (error) {}
    })();
  }, []);

  return (
    <main>
      <div>
        <Link to='/task/new'>New Task</Link>

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
        {stagedTasks.map((stage, i) => (
          <Stage key={i} stage={stage} />
        ))}
      </div>
    </main>
  );
}

export default Stages;

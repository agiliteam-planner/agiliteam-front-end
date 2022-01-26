import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Stage from './Stage';

import '../styles/Stages.css';

function Stages(props) {
  // Initial values while loading tasks from API
  const placeholderTask = { title: 'Loading...' };
  const placeholderStages = ['To Do', 'In Progress', 'In Review', 'Done'];
  const placeholderStagedTasks = [
    { name: 'To Do', tasks: [placeholderTask] },
    { name: 'In Progress', tasks: [placeholderTask] },
    { name: 'In Review', tasks: [placeholderTask] },
    { name: 'Done', tasks: [placeholderTask] },
  ];

  // State for stages and tasks
  const [users, setUsers] = useState([]);
  const [stages, setStages] = useState(placeholderStages);
  const [stagedTasks, setStagedTasks] = useState(placeholderStagedTasks);

  // Sorts all tasks from API request into each stage
  function refreshTasks(tasks) {
    const newStagedTasks = stages.map((stage) => {
      const stageTasks = tasks.filter((task) => task.stage === stage);
      return { name: stage, tasks: stageTasks };
    });
    const newUsers = [...new Set(tasks.map((task) => task.owner))].sort(
      (a, b) => (a.firstName > b.firstName ? 1 : -1)
    );
    setUsers(newUsers);
    setStagedTasks(newStagedTasks);
  }

  // On initial mount
  useEffect(() => {
    // TODO: Move url to a settings location or env variable?
    const backendUrl = 'https://arcane-plateau-58687.herokuapp.com';

    // IIFE to make it async
    (async () => {
      try {
        const stagesResponse = await axios.get(backendUrl + '/settings');
        setStages(stagesResponse.data[0].stages);

        const tasksResponse = await axios.get(backendUrl + '/tasks');
        refreshTasks(tasksResponse.data);
      } catch (error) {
        // TODO: Handle errors for user
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='stages-heading'>
        <Link className='new-task' to='/task/new'>
          New Task
        </Link>

        <ul className='stages-options'>
          {/* Each filter adds search params? to be bookmarkable */}
          <li>Sort:</li>
          <li>
            <button>Priority ▽</button>
          </li>
          <li>
            <button>Due Date △</button>
          </li>
          <li>
            <label htmlFor='filter-user'>Filter: </label>
            <select name='filter-user' id='filter-user' defaultValue={null}>
              <option value={null}></option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {`${user.firstName} ${user.lastName.charAt(0)}.`}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
      <div className='stages-container'>
        {stagedTasks.map((stage, i) => (
          <Stage key={i} stage={stage} />
        ))}
      </div>
    </>
  );
}

export default Stages;

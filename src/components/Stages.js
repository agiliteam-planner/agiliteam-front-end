import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Stage from './Stage';

import '../styles/Stages.css';

function Stages(props) {
  // Hardcoded stages to show all stages even if empty
  const stages = [
    { name: 'Todo', tasks: [] },
    { name: 'In Progress', tasks: [] },
    { name: 'In Review', tasks: [] },
    { name: 'Done', tasks: [] },
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
        const response = await axios.get(backendUrl + '/tasks');
        updateTasks(response.data);
      } catch (error) {
        // TODO: Handle errors for user
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div className='stages-heading'>
        <Link className='new-task' to='/task/new'>
          New Task
        </Link>

        <ul className='stages-options'>
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
    </>
  );
}

export default Stages;

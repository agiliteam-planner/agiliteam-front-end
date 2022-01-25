import { Link } from 'react-router-dom';

import Stage from './Stage';

function Stages(props) {
  return (
    <main>
      <div>
        <Link to='new'>New Task</Link>
        <ul>
          <li>Filter</li>
          <li>Filter</li>
          <li>Filter</li>
        </ul>
      </div>
      <div>
        <Stage />
      </div>
    </main>
  );
}

export default Stages;

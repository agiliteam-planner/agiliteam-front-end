import { useState } from 'react';
import { Link } from 'react-router-dom';

import Stage from './Stage';

function Stages(props) {
  const [stages, setStages] = useState([]);

  return (
    <main>
      <div>
        <Link to='new'>New Task</Link>
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
        </ul>
      </div>
      <div>{stages.forEach}</div>
    </main>
  );
}

export default Stages;

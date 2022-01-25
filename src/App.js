import { Routes, Route, NavLink } from 'react-router-dom';

import Stages from './components/Stages';
import CardDetails from './components/CardDetails';
import About from './components/About';
import Settings from './components/Settings';

import './App.css';

function App() {
  return (
    <div className='app'>
      <header className='header'>
        <h1>AgiliTeam</h1>
        <ul>
          <li>
            <NavLink
              to='settings'
              // Apply following linesto all NavLinks when defining link styling
              // className={({ isActive }) =>
              //   isActive ? activeClassName : undefined
              // }
            >
              Settings
            </NavLink>
            <NavLink to='about'>About</NavLink>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path='/' element={<Stages />} />
        <Route path='/details' element={<CardDetails />} />
        <Route path='/new' element={<CardDetails createNew={true} />} />
        <Route path='/about' element={<About />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

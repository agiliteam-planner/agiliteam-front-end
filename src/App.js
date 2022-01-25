import { Routes, Route } from 'react-router-dom';

import Stages from './components/Stages';
import TaskDetails from './components/TaskDetails';
import About from './components/About';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Navigation />
      <Routes>
        <Route path='/' element={<Stages />} />
<<<<<<< HEAD
        <Route path='/task/:id' element={<TaskDetails />} />
        <Route path='/task/new' element={<TaskDetails createNew={true} />} />
=======
        <Route path='/task/:id' element={<CardDetails />} />
        <Route path='/task/new' element={<CardDetails createNew={true} />} />
>>>>>>> ea7f6a5 (added tasks.json file)
        <Route path='/about' element={<About />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

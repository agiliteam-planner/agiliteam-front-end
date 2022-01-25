import { Routes, Route } from 'react-router-dom';

import Stages from './components/Stages';
import TaskDetails from './components/TaskDetails';
import About from './components/About';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

import './App.css';

function App() {
<<<<<<< HEAD
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
=======
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<Stages />} />
				<Route path='/task/:id' element={<TaskDetails />} />
				<Route path='/task/new' element={<TaskDetails createNew={true} />} />
				<Route path='/about' element={<About />} />
				<Route path='/settings' element={<Settings />} />
			</Routes>
		</div>
	);
>>>>>>> f3cb376 (pull dev branch)
}

export default App;

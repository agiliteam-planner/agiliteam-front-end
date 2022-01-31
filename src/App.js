import { Routes, Route } from 'react-router-dom';

import Stages from './components/Stages';
import TaskDetails from './components/TaskDetails';
import About from './components/About';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import './styles/App.css';

function App() {
	return (
		<div className='app'>
			<Navigation />
			<main>
				<Routes>
					<Route path='/' element={<Stages />} />
					<Route path='/task/:id' element={<TaskDetails />} />
					<Route path='/task/new' element={<TaskDetails createNew={true} />} />
					<Route path='/about' element={<About />} />
					<Route path='/settings' element={<Settings />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;

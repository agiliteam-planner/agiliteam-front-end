import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './context/UserContext';

import Stages from './components/Stages';
import TaskDetails from './components/TaskDetails';
import About from './components/About';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import Login from './components/Login';

import './styles/App.css';

function App() {
	const [currentUser, setCurrentUser] = useState(null);

	return (
		<div className='app'>
			<UserContext.Provider value={{ currentUser }}>
				<Navigation setCurrentUser={setCurrentUser} />
				<main>
					<Routes>
						<Route path='/' element={<Stages />} />
						<Route path='/task/:id' element={<TaskDetails />} />
						<Route
							path='/task/new'
							element={<TaskDetails createNew={true} />}
						/>
						<Route path='/about' element={<About />} />
						<Route
							path='/login'
							element={<Login setCurrentUser={setCurrentUser} />}
						/>
						<Route path='/settings' element={<Settings />} />
						<Route path='*' element={<Navigate to='/home' />} />
					</Routes>
				</main>
			</UserContext.Provider>
		</div>
	);
}

export default App;

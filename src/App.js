import { Routes, Route } from 'react-router-dom';
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
	const [user, setUser] = useState(null);

	return (
		<div className='app'>
			<UserContext.Provider value={{ user }}>
				<Navigation />
				<main>
					<Routes>
						<Route path='/' element={<Stages />} />
						<Route path='/task/:id' element={<TaskDetails />} />
						<Route
							path='/task/new'
							element={<TaskDetails createNew={true} />}
						/>
						<Route path='/about' element={<About />} />
						<Route path='/login' element={<Login setUser={setUser}/>} />
						<Route path='/settings' element={<Settings />} />
					</Routes>
				</main>
			</UserContext.Provider>
		</div>
	);
}

export default App;

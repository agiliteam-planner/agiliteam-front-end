import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation(props) {
	return (
		<header className='app-header'>
			<div className='header-titles'>
                <Link to='/'>
                    <h1 className='nav-title'>AgiliTeam</h1>
                </Link>
                <h2 className='nav-sub-title'>Project Planner</h2>
            </div>
			<nav className='header-nav'>
				<ul className='nav-list'>
					<li className='nav-item'>
						<Link to='/settings'>Settings</Link>
					</li>
					<li className='nav-item'>
						<Link to='/about'>About</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Navigation;

import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import '../styles/Navigation.css';
import MobileMenu from './MobileMenu';

function Navigation({ setCurrentUser }) {
	const { currentUser } = useContext(UserContext);
	

	const initials = (user) => {
		return user
			? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
			: '';
	};

	function handleLogout(ev) {
		setCurrentUser(null);
		return <Navigate to='/' />;
	}
	return (
		<header className='app-header'>
			<div className='mobile-nav'>
				<MobileMenu handleLogout={handleLogout} initials={initials} />
			</div>
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
					{currentUser ? (
						<>
							<li className='nav-item' onClick={handleLogout}>
								<p className='nav-logout'>Logout</p>
							</li>
							<p className='nav-initials'>{initials(currentUser)}</p>
						</>
					) : (
						<li className='nav-item'>
							<Link to='/login'>Login</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Navigation;

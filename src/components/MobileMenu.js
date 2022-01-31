import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/MobileMenu.css'

function MobileMenu({ handleLogout , initials}) {
	const { currentUser } = useContext(UserContext);
    const [showMobile, setShowMobile] = useState(false);

		const toggleMobile = () => {
            console.log(showMobile);
			setShowMobile(!showMobile);
		};

	return (

		<div className='mobile-nav' onClick={toggleMobile}>
			<ul className='mobile-nav-list'>
				<li className='mobile-nav-item'>
					<Link to='/settings'>Settings</Link>
				</li>
				<li className='mobile-nav-item'>
					<Link to='/about'>About</Link>
				</li>
				{currentUser ? (
					<>
						<li className='mobile-nav-item' onClick={handleLogout}>
							<p className='mobile-nav-logout'>Logout</p>
						</li>
						<p className='mobile-nav-initials'>{initials(currentUser)}</p>
					</>
				) : (
					<li className='mobile-nav-item'>
						<Link to='/login'>Login</Link>
					</li>
				)}
			</ul>
		</div>
	);
}

export default MobileMenu;

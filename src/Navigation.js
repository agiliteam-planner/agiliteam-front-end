import React from 'react';

function Navigation(props) {
  return (
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
  );
}

export default Navigation;

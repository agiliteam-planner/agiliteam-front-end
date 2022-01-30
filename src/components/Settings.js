import Users from './Users';

import '../styles/Settings.css';

function Settings(props) {
	return (
		<div className='main-section-style'>
			<h2 className='section-heading-style'>Settings</h2>
			<Users />
			{/* look at <Users /> top div to match styling when adding other Settings panels */}
		</div>
	);
}

export default Settings;

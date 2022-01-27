import Users from './Users';

import '../styles/Settings.css';

function Settings(props) {
	return (
		<>
			<h2>Settings</h2>
			<Users />
			{/* look at <Users /> top div to match styling when adding other Settings panels */}
		</>
	);
}

export default Settings;

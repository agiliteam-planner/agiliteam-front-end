import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer(props) {
	return (
		<div className='app-footer'>
			<Link to='https://github.com/agiliteam-planner/agiliteam-front-end'>
				Visit Github Repo
			</Link>
		</div>
	);
}

export default Footer;

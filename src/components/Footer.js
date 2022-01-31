import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer(props) {
	return (
		<div className='app-footer'>
			Visit Github Repositories:
			<div className='footer-links'>
				<Link to='https://github.com/agiliteam-planner/agiliteam-front-end'>
					Front End
				</Link>
				{'|'}
				<Link to='https://github.com/agiliteam-planner/agiliteam-back-end'>
					API
				</Link>
			</div>
		</div>
	);
}

export default Footer;

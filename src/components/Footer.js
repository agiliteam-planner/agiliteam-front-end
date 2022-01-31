import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer(props) {
	return (
		<div className='app-footer'>
			Visit Github Repositories:
			<div className='footer-links'>
				<a href='https://github.com/agiliteam-planner/agiliteam-front-end'>
					Front End
				</a>
				{'|'}
				<a href='https://github.com/agiliteam-planner/agiliteam-back-end'>
					API
				</a>
			</div>
		</div>
	);
}

export default Footer;

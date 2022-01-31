import '../styles/About.css';

function About(props) {
	return (
		<div className='main-section-style'>
			<div className='about-container panel-style'>
				<h3>About AgiliTeam</h3>
				<p>
					The AgiliTeam Project Planner was designed and developed to help teams
					using an Agile methodology to manage their workflow. Tasks are
					designed to be easily created, staged, and updated as needed. Teams
					using AgiliTeam can also create and assign users to tasks quickly and
					efficiently.
				</p>
				<br />
				<img
					src='https://i.imgur.com/7uXGHDs.jpg'
					alt="Still from Silicon Valley's kanban board scene"
				/>
				<p className='subscript'>Silicon Valley(2014). Property of HBO</p>
				<br />
				<p>
					Inspired by kanban boards such as those seen on the TV show Silicon
					Valley, AgiliTeam is designed to help teams visualize the workflow at
					a glance, with each task name, owner, and priority clearly visible.
				</p>
				<br />
				<p>
					AgiliTeam was developed by Elad Sadeh, Oscar Sanchez de Zulueta, and
					Kurt Shields of the General Assembly SEIR1115 cohort.
				</p>
			</div>
		</div>
	);
}

export default About;

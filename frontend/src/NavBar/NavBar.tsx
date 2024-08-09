import { NavLink } from "react-router-dom";

import "./NavBar.scss";

export default function NavBar() {
	
	const env = import.meta.env.VITE_ENV;
	
	return (
		<div className='nav-bar'>
			
			<div className="links">
				<NavLink to="/all" className='nav-link'>All</NavLink>
				<NavLink to="/today" className='nav-link'>Today</NavLink>
				<NavLink to="/three-day" className='nav-link'>3-Day</NavLink>
				<NavLink to="/calendar" className='nav-link'>Calendar</NavLink>
			</div>
			
			
			
			<p>{env}</p>
			
		</div>
	)
}



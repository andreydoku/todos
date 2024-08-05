import { NavLink } from "react-router-dom";

import "./NavBar.scss";

export default function NavBar() {
	
	return (
		<div className='nav-bar'>
			
			<NavLink to="/all" className='nav-link'>All</NavLink>
			<NavLink to="/today" className='nav-link'>Today</NavLink>
			<NavLink to="/three-day" className='nav-link'>3-Day</NavLink>
			<NavLink to="/calendar" className='nav-link'>Calendar</NavLink>
			
		</div>
	)
}



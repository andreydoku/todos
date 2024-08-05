import { NavLink } from "react-router-dom";

import "./NavBar.scss";



export default function NavBar() {
	
	// const logo = "LOGO";

	return (
		<div className='nav-bar'>
			
			<NavLink to="/all-old" className='nav-link'>All (Old)</NavLink>
			<NavLink to="/all" className='nav-link'>All</NavLink>
			
			<NavLink to="/today-old" className='nav-link'>Today (Old)</NavLink>
			<NavLink to="/today" className='nav-link'>Today</NavLink>
			
			<NavLink to="/three-day-old" className='nav-link'>3-Day (Old)</NavLink>
			<NavLink to="/three-day" className='nav-link'>3-Day</NavLink>
			
			<NavLink to="/calendar-old" className='nav-link'>Calendar (Old)</NavLink>
			<NavLink to="/calendar" className='nav-link'>Calendar</NavLink>
			
		</div>
	)
}



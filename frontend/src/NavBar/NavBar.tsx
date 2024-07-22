import { NavLink } from "react-router-dom";

import "./NavBar.scss";



export default function NavBar() {
	
	// const logo = "LOGO";

	return (
		<div className='nav-bar'>
			
			{/* <NavLink 
				to="/"  
				className={({ isActive }) =>
					"nav-link" + (isActive ? " active":"")}
			>
				Home
			</NavLink> */}
					
			<NavLink to="/all" className='nav-link'>All</NavLink>
			<NavLink to="/today" className='nav-link'>Today</NavLink>
			<NavLink to="/demo" className='nav-link'>Demo</NavLink>
			<NavLink to="/demo2" className='nav-link'>Demo 2</NavLink>

		</div>
	)
}



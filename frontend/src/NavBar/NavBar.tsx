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

		</div>
	)
}



import { NavLink } from "react-router-dom";
import "./NavBarLink.scss";
import { ReactNode } from "react";

type NavBarLinkProps = {
	expanded: boolean;
	icon: ReactNode;
	text: string;
	count: number;
	linkTo: string;
}
export default function NavBarLink({ expanded , icon , text , count , linkTo }: NavBarLinkProps) {
	
	let cn = "nav-bar-link";
	cn += " " + (expanded?"expanded":"collapsed");
	
	
	return (
		<NavLink to={linkTo} className={cn}>
			
			<div className="icon-container">
				{icon}
			</div>
			
			<div className="right-container">
				<p className="text">{text}</p>
				<p className="count">{count}</p>
			</div>
			
		</NavLink>
	)
}

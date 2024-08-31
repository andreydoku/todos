
import { Dayjs } from "dayjs";
import { getMondayOf, getToday, isDayWithinRange, stringToDatejs } from "../utils/utils";

import { BiColumns } from "react-icons/bi";
import { MdCalendarMonth } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import { useTodos } from "../providers/TodoProvider";

import { useEffect, useState } from "react";

import NavBarLink from "./NavBarLink";
import DayIcon from "./DayIcon";
import useWindowDimensions from "../utils/useWindowDimensions";

import "./NavBar.scss";

export default function NavBar() {
	
	
	const [expanded, setExpanded] = useState<boolean>( true );
	
	const { height, width } = useWindowDimensions();
	
	
	useEffect(() => {
		console.log("width changed: " + width);
		
		if( width < 1200 && expanded ){
			console.log("width: " + width);
			
			setExpanded(false);
		}
		
	}, [width])
	
	
	
	const todayDate:Dayjs = getToday();
	const dayNumber = todayDate.get("date");
	
	const { todos } = useTodos();
	const allCount = todos.length;
	const todayCount = todos.filter( todo => todo.doDate == todayDate.format('YYYY-MM-DD')).length;
	const threeDayCount = getCountForDateRange( todayDate , todayDate.add(2,"day") );
	const calendarCount = getCountForDateRange( getMondayOf( todayDate ) , todayDate.add(20,"day") );
	
	let cn = "nav-bar";
	if( expanded )  cn += " expanded";
	else			cn += " collapsed";
	
	return (
		<aside className={ cn }>
			
			<div className="links">
				
				
				<ExpandButton 
					expanded={ expanded }
					setExpanded={ setExpanded }
				/>
				
				<NavBarLink expanded={expanded} icon={<IoMdClipboard />}               text="All"      count={allCount}      linkTo="/all"       />
				<NavBarLink expanded={expanded} icon={<DayIcon number={ dayNumber }/>} text="Today"    count={todayCount}    linkTo="/today"     />
				<NavBarLink expanded={expanded} icon={<BiColumns />}                   text="3-Day"    count={threeDayCount} linkTo="/three-day" />
				<NavBarLink expanded={expanded} icon={<MdCalendarMonth />}             text="Calendar" count={calendarCount} linkTo="/calendar"  />
				
			</div>
			
			<p style={{fontSize:"10px",textWrap:"wrap", textAlign:"center", position:"absolute", bottom: "20px", right: "20px", color: "white"}}>
				{width} × {height} 
			</p>
			
		
		</aside>
	)
	
	function getCountForDateRange( dateFrom:Dayjs , dateTo:Dayjs ){
		
		const filteredTodos = todos.filter( todo => {
			
			const doDate = stringToDatejs(todo.doDate);
			if( doDate == null ){
				return false;
			}
			
			return isDayWithinRange( doDate , dateFrom , dateTo );
			
		});
		
		return filteredTodos.length;
		
	}
	
	
}









import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapse  } from "react-icons/tb";


function ExpandButton({ expanded , setExpanded }: {expanded: boolean, setExpanded: (expanded:boolean)=>void }){
	
	const expandIcon = <TbLayoutSidebarLeftExpand />
	const collapseIcon = <TbLayoutSidebarLeftCollapse  />
	
	
	return(

		
		<div className="expand-button" onClick={ () => setExpanded(!expanded) }>
			{ expanded ? collapseIcon : expandIcon }
		</div>
	);
	
	
}


/*
icon ideas

	all - ???
	today - show a sticky with todays date (number)
		like the ripoff calendar thingies
	3-day - show 3 column thingy
	calendar - calendar icon



*/

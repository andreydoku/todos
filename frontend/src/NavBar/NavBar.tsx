import { NavLink } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

import { BiColumns } from "react-icons/bi";
import { MdCalendarMonth } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";

import "./NavBar.scss";

export default function NavBar() {
	
	const env = import.meta.env.VITE_ENV;
	
	const todayDate:Dayjs = dayjs();
	const dayNumber = todayDate.get("date");
	
	const { todos } = useTodos();
	const allCount = todos.length;
	const todayCount = todos.filter( todo => todo.doDate == todayDate.format('YYYY-MM-DD')).length;
	const threeDayCount = getCountForDateRange( todayDate , todayDate.add(2,"day") );
	const calendarCount = getCountForDateRange( getMondayOf( todayDate ) , todayDate.add(20,"day") );
	
	return (
		<div className='nav-bar'>
			
			<div className="links">
				<NavLink to="/all" className='nav-link'>
					<IoMdClipboard />
					<div className="mid">
						<p className="nav-link-text">All</p>
					</div>
					<p className="count">{allCount}</p>
				</NavLink>
				
				<NavLink to="/today" className='nav-link'>
					<DayIcon number={ dayNumber }/>
					<div className="mid">
						<p className="nav-link-text">Today</p>
					</div>
					<p className="count">{todayCount}</p>
				</NavLink>
				
				<NavLink to="/three-day" className='nav-link'>
					<BiColumns />
					<div className="mid">
						<p className="nav-link-text">3-Day</p>
					</div>
					<p className="count">{threeDayCount}</p>
				</NavLink>
				
				<NavLink to="/calendar" className='nav-link'>
					<MdCalendarMonth />
					<div className="mid">
						<p className="nav-link-text">Calendar</p>
					</div>
					<p className="count">{calendarCount}</p>
				</NavLink>
			</div>
			
			
			
			<p>{env}</p>
			
		</div>
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




import { MdCalendarToday } from "react-icons/md";
import { useTodos } from "../providers/TodoProvider";
import { getMondayOf, isDayWithinRange, stringToDatejs } from "../utils/utils";

function DayIcon({ number }: {number: number}){
	
	return(
		
		<div className="day-icon">
			<MdCalendarToday />
			<p className="number">
				{number}
			</p>
		</div>
		
	)
}


/*
icon ideas

	all - ???
	today - show a sticky with todays date (number)
		like the ripoff calendar thingies
	3-day - show 3 column thingy
	calendar - calendar icon



*/

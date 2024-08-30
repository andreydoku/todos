import { MdCalendarToday } from "react-icons/md";

import "./DayIcon.scss";

export default function DayIcon({ number }: {number: number}){
	
	return(
		
		<div className="day-icon">
			<MdCalendarToday />
			<p className="number">
				{number}
			</p>
		</div>
		
	)
}
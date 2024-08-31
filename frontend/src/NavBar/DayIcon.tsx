import { MdCalendarToday } from "react-icons/md";

import "./DayIcon.scss";
import { getToday } from "../utils/utils";

type DayIconProps = {
	number?: number
	onClick?: ()=>void;
}
export default function DayIcon({ number , onClick=()=>{} }: DayIconProps){
	
	if( !number ){
		const today = getToday();
		const todayDayNumber = today.get("date");
		number = todayDayNumber;
	}
	
	return(
		
		<div onClick={onClick} className="day-icon">
			<MdCalendarToday />
			<p className="number">
				{number}
			</p>
		</div>
		
	)
}
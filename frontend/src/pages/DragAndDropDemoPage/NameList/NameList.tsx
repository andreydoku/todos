import { useDroppable } from "@dnd-kit/core";
import NameItem from "../NameItem/NameItem";
import "./NameList.scss";


type NamesListProps = {
	title?: string
	names?: string[]
}
export default function NameList({ title="" , names=[] }: NamesListProps) {
	
	const { isOver, setNodeRef } = useDroppable({
		id: title,
	});
	
	let cn = "name-list";
	if( isOver )
	{
		cn += " " + "is-over";
	}

	
	return (
		<div className={cn} ref={setNodeRef}>
			<h2 className="title">{title}</h2>
			<div className="names-area">
				
				{ names.map( name => 
					<NameItem name={name} key={name}/>
				) }
				
			</div>
		</div>
	)
}

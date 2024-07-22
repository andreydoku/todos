import { useDraggable } from "@dnd-kit/core";
import "./NameItem.scss";

export default function NameItem({ name }: { name: string }) {
	
	
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: name,
	});
	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	} : undefined;
	
	let cn = "name-item";
	if( transform ){
		cn += " grabbed";
	}

	return (
		<div className={cn} ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<p>{name}</p>
		</div>
	)
}

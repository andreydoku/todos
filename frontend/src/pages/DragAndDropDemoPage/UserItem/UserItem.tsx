import { useDraggable } from "@dnd-kit/core";
import "./UserItem.scss";
import { User } from "../User";

export default function UserItem({ user }: { user: User }) {
	
	
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: user.id,
		data: user
	});
	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	} : undefined;
	
	let cn = "user-item";
	if( transform ){
		cn += " grabbed";
	}

	return (
		<div className={cn} ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<p>
				{user.name}
			</p>
		</div>
	)
}

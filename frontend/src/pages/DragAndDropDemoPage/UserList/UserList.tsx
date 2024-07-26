import { useDroppable } from "@dnd-kit/core";
import "./UserList.scss";
import { User } from "../User";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableUserItem from "../SortableUserItem/SortableUserItem";


type UserListProps = {
	title?: string
	users?: User[]
}
export default function UserList({ title="" , users=[] }: UserListProps) {
	
	const { isOver, setNodeRef } = useDroppable({
		id: title,
	});
	
	let cn = "user-list";
	if( isOver )
	{
		cn += " " + "is-over";
	}

	
	return (
		<div className={cn} >
			<h2 className="title">{title}</h2>
			
			<SortableContext
				id={title}
				items={users}
				strategy={verticalListSortingStrategy}
				>
					
				<div className="user-area" ref={setNodeRef} >
				
					{ users.map( (user:User) => 
						<SortableUserItem user={user} key={user.id}>
							
						</SortableUserItem>
						
					) }
				
				</div>
				
			</SortableContext>
			
		</div>
	)
}

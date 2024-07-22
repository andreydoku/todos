import { useDroppable } from "@dnd-kit/core";
import "./UserList.scss";
import { User } from "../User";
import UserItem from "../UserItem/UserItem";


type UserListProps = {
	title?: string
	users?: User[]
}
export default function UserList({ title="" , users: names=[] }: UserListProps) {
	
	const { isOver, setNodeRef } = useDroppable({
		id: title,
	});
	
	let cn = "user-list";
	if( isOver )
	{
		cn += " " + "is-over";
	}

	
	return (
		<div className={cn} ref={setNodeRef}>
			<h2 className="title">{title}</h2>
			<div className="user-area">
				
				{ names.map( (user:User) => 
					<UserItem user={user} key={user.id}/>
				) }
				
			</div>
		</div>
	)
}


import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import UserItem from '../UserItem/UserItem';
import { User } from '../User';

type SortableUserItemProps = {
	user: User
};

export default function SortableUserItem({ user }: SortableUserItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: user.id, data:user });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.6 : 1,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<UserItem user={user} />
		</div>
	);
};

import './AddTaskButton.scss';

type AddTaskButtonProps = {
	onClick: () => void
}

function AddTaskButton({ onClick }: AddTaskButtonProps){
	
	if( onClick === undefined ) onClick = () => {};
	
	return(
		
		<div className="add-task-button" onClick={() => onClick()}>
			Add New Task
		</div>
		
	);
	
}

export default AddTaskButton;
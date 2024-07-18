import './AddTaskButton.css';

function AddTaskButton({ onClick }){
	
	if( onClick === undefined ) onClick = () => {};
	
	return(
		
		<div className="add-task-button" onClick={() => onClick()}>
			Add New Task
		</div>
		
	);
	
}
export default AddTaskButton;
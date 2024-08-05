import { isEmptyString } from "../utils/utils";


export type TodoUpdateRequest = {
	title?: string
	done?: boolean
	doDate?: string|null
}


export function isTodoUpdateRequest(object:any): string|null{
	
	const isObject = (typeof object === 'object' && !Array.isArray(object) && object !== null);
	if( !isObject ){
		return "object cannot be empty";
	}
	
	const isEmptyObject = JSON.stringify(object) === '{}';
	if( isEmptyObject ){
		return "object cannot be empty";
	}
	
	if( isEmptyString( object.title ) )		return "title cannot be empty";
	if( isEmptyString( object.doDate ) )	return "doDate cannot be empty";
	
	const acceptedFields = [ 
		{ name:"title", type: "string"},
		{ name:"done", type: "boolean"},
		{ name:"doDate", type: "string"},
	]
	
	let fieldName: keyof typeof object;
	for ( fieldName in object )
	{
		
		const fieldValue = object[fieldName];
		const fieldType = typeof fieldValue;
		
		//log("checking fieldName: " + fieldName + " value: " + fieldValue + " fieldType: " + fieldType)
		
		const acceptedField = acceptedFields.find( field => field.name == fieldName );
		
		//checks if that field is even on the list of accepted fields
		if( !acceptedField ){
			return "field " + fieldName + " is not allowed, you dumb fuck";
		}
		
		if( fieldValue == null ){
			return "field " + fieldName + " is null, which is not allowed";
		}
		
		//checks if the type is correct
		if( fieldType != acceptedField.type ){
			return "field " + fieldName + " is wrong type!" + " input: " + fieldType + " required:" + acceptedField.type;
		}
		
	}
	
	
	return null;
}




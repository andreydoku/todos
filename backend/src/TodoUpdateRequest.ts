
import { log } from "console";

export type TodoUpdateRequest = {
	title: string|undefined
	done: boolean|undefined
}

export function isTodoUpdateRequest(object:any){
	
	//TODO - check for required fields
	
	const isObject = (typeof object === 'object' && !Array.isArray(object) && object !== null);
	if( !isObject ){
		log( "object cannot be empty" );
		return false;
	}
	
	const isEmptyObject = JSON.stringify(object) === '{}';
	if( isEmptyObject ){
		log( "object cannot be empty" );
		return false;
	}
	
	
	const acceptedFields = [ 
		{ name:"title", type: "string"},
		{ name:"done", type: "boolean"},
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
			log("field " + fieldName + " is not allowed, you dumb fuck")
			return false;
		}
		
		if( fieldValue == null ){
			log("field " + fieldName + " is null, which is not allowed")
			return false;
		}
		
		//checks if the type is correct
		if( fieldType != acceptedField.type ){
			log( "field " + fieldName + " is allowed, but wrong type!" 
				+ "\n\t" + "allowed type: " + acceptedField.type
				+ "\n\t" + "type you sent: " + fieldType
			);
			return false;
		}
		
	}
	
	
	return true;
}
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat);


export function validateTodoUpdateRequest(object:any): string|null{
	
	if( object == null ){
		return "object cannot be null";
	}
	if( object == undefined ){
		return "object cannot be undefined";
	}
	
	const isObject = (typeof object === 'object' && !Array.isArray(object) && object !== null);
	if( !isObject ){
		return "has to be an object";
	}
	
	const isEmptyObject = JSON.stringify(object) === '{}';
	if( isEmptyObject ){
		return "object cannot be empty";
	}
	

	
	if( object.doDate ){
		let dateError = validateDate( object.doDate );
		if( dateError ){
			return dateError.replace( "{field}" , "doDate" );
		}
		
	}
	
	
	const acceptedFields = [
		{ name:"title"   , type: "string"  , required: false , nullAllowed: false , emptyStringAllowed: false },
		{ name:"done"    , type: "boolean" , required: false , nullAllowed: false , emptyStringAllowed: false },
		{ name:"doDate"  , type: "string"  , required: false , nullAllowed: true  , emptyStringAllowed: false },
		{ name:"category", type: "string"  , required: false , nullAllowed: true  , emptyStringAllowed: false },
	]
	
	//check that all required fields exist
	const requiredFieldNames:string[] = acceptedFields
		.filter( acceptedField => acceptedField.required )
		.map( requiredField => requiredField.name );
	
	for( let i=0; i<requiredFieldNames.length; i++ ){
		const requiredFieldName = requiredFieldNames[i];
		if( object[requiredFieldName] == undefined ){
			return `field '${requiredFieldName}' is missing`;
		}
	}
	
	
	let fieldName: keyof typeof object;
	for ( fieldName in object )
	{
		const fieldValue = object[fieldName];
		const fieldType = typeof fieldValue;
		
		//log("checking fieldName: " + fieldName + " value: " + fieldValue + " fieldType: " + fieldType)
		
		const acceptedField = acceptedFields.find( field => field.name == fieldName );
		
		//checks if that field is even on the list of accepted fields
		if( !acceptedField ){
			return `field '${fieldName}' is not allowed`;
		}
		
		if( !acceptedField.nullAllowed && fieldValue == null ){
			return `field '${fieldName}' is null, which is not allowed`;
		}
		
		if( fieldType == "string" && fieldValue.trim() == "" && acceptedField.emptyStringAllowed == false ){
			return `field '${fieldName}' is empty string, which is not allowed`;
		}
		
		//checks if the type is correct
		if( fieldType != acceptedField.type  &&  fieldValue != null ){
			return `field '${fieldName}' is wrong type!  input: ${fieldType},  required: ${acceptedField.type}`
		}
		
	}
	
	
	return null;
}

export function validateCreateRequest(object:any): string|null{
	
	if( object == null ){
		return "object cannot be null";
	}
	if( object == undefined ){
		return "object cannot be undefined";
	}
	
	const isObject = (typeof object === 'object' && !Array.isArray(object) && object !== null);
	if( !isObject ){
		return "has to be an object";
	}
	
	const isEmptyObject = JSON.stringify(object) === '{}';
	if( isEmptyObject ){
		return "object cannot be empty";
	}
	
	
	
	const acceptedFields = [ 
		{ name:"title"    , type: "string"  , required: true  , nullAllowed: false , emptyStringAllowed: false },
		{ name:"done"     , type: "boolean" , required: true  , nullAllowed: false , emptyStringAllowed: false },
		{ name:"doDate"   , type: "string"  , required: false , nullAllowed: true  , emptyStringAllowed: false },
		{ name:"category" , type: "string"  , required: false , nullAllowed: true  , emptyStringAllowed: false },
	]
	
	
	//check that all required fields exist
	const requiredFieldNames:string[] = acceptedFields
		.filter( acceptedField => acceptedField.required )
		.map( requiredField => requiredField.name );
	
	for( let i=0; i<requiredFieldNames.length; i++ ){
		const requiredFieldName = requiredFieldNames[i];
		if( object[requiredFieldName] == undefined ){
			return `field '${requiredFieldName}' is missing`;
		}
	}
	
	
	
	let fieldName: keyof typeof object;
	for ( fieldName in object )
	{
		
		const fieldValue = object[fieldName];
		const fieldType = typeof fieldValue;
		
		
		const acceptedField = acceptedFields.find( field => field.name == fieldName );
		
		
		//checks if that field is even on the list of accepted fields
		if( !acceptedField ){
			return `field '${fieldName}' is not allowed`;
		}
		
		//check if null
		if( !acceptedField.nullAllowed && fieldValue == null ){
			return `field '${fieldName}' is null, which is not allowed`;
		}
		
		//check if empty string
		if( fieldType == "string" && fieldValue.trim() == "" && acceptedField.emptyStringAllowed == false ){
			return `field '${fieldName}' is empty string, which is not allowed`;
		}
		
		//checks if the type is correct
		if( fieldType != acceptedField.type  &&  fieldValue != null ){
			return `field '${fieldName}' is wrong type!  input: ${fieldType},  required: ${acceptedField.type}`
		}
		
	}
	
	
	
	return null;
}



export function isEmptyString( value: any ){
	
	if( value == null || value == undefined ){
		return false;
	}
	
	return (typeof value ) == "string"   &&   value.trim() === "";
	
}
export function validateDate( dateStr:string|null|undefined ) :string|null{
	
	//https://day.js.org/docs/en/parse/is-valid
	
	
	
	console.log(`validateDate: ${dateStr}`)
	
	if( dateStr == undefined ){
		return "field '{field}' cannot be undefined";
	}
	if( dateStr == null ){
		return null;
	}
	
	if( dateStr.trim() === "" ){
		return "field '{field}' cannot be blank";
	}
	
	
	// try{
	// 	const date:Date = new Date( dateStr );
		
	// 	const properFormatted = date.toISOString().split('T')[0];
	// 	if( properFormatted !== dateStr ){
	// 		return "{field} slightly invalid format"
	// 	}
		
	// }
	// catch(error){
	// 	return "{field} invalid date format";
	// }
	
	const isValid = dayjs( dateStr , 'YYYY-MM-DD', true).isValid();
	//const date = dayjs( dateStr );
	//const isValid = date.isValid();
	
	
	console.log( `dateStr=${dateStr} isValid=${isValid}`  );
	
	
	return isValid ? null : "field '{field}' is invalid date format" ;

}
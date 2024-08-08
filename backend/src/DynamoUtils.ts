export function getUpdateExpression( object:Object ): string{
		
	/*
		need to turn this:
			{
				name: "Andrey",
				address: "123 Street Drive"
			}
		
		into this:
			SET name = :name, address = :address
		
		
	*/
	
	const updateExpressions:string[] = [];
	
	let fieldName: keyof typeof object;
	for ( fieldName in object )
	{
		//const fieldValue = object[fieldName];
		
		//example of one expression: 
		//	address = :address
		
		const updateExpression = fieldName + " = " + ":" + fieldName;
		updateExpressions.push( updateExpression );
	}
	
	const updateExpression:string = "SET " + updateExpressions.join(", ");
	return updateExpression;
	
}

export function getExpressionAttributeValues( object:Object ): object{
	
	/*
		need to turn this:
			{
				name: "Andrey",
				address: "123 Street Drive"
			}
		
		into this:
			{
				":name" : "Andrey",
				":address " : "123 Street Drive" ,
			}
		
		
	*/
	
	const expressionAttributeValues: Record<string,any> = {};
	//const expressionAttributeValues: {[k: string]: any} = {};
	
	let fieldName: keyof typeof object;
	for ( fieldName in object )
	{
		const fieldValue = object[fieldName];
		
		
		const key = ":" + fieldName;
		expressionAttributeValues[key] = fieldValue;
		
	}
	
	return expressionAttributeValues;
	
}
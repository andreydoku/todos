import { log } from "console";
import { Service } from "../src/Service";



const service:Service = new Service();

const item = {
	name: "Andrey",
	address: "123 Street Drive"
}
log( item );

log();

const updateExpression = service.getUpdateExpression( item );
console.log( "UpdateExpression:" + "\n" +  updateExpression );

log();

const expressionAttributeValues = service.getExpressionAttributeValues( item );
log( "ExpressionAttributeValues:"  );
log( expressionAttributeValues )

//npx ts-node tests/ServiceTest.ts




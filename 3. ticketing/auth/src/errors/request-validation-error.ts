import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

// In a diferent file
// interface CustomError{
//     statusCode: number,
//     serializeErrors(): {
//         message: string;
//         field?: string
//     }[]
// }

export class RequestValidationError extends CustomError{ // implement the interface

    statusCode= 400;

    constructor(public errors: ValidationError[]){
        super('Invalid request parameters');

        // only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(){ // probably an error about the implementation of the function
        return  this.errors.map((error) => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path }; // if instead of message we put another thing like msg
            }else {
                return { message: error.msg };
            }
        });
    }
}


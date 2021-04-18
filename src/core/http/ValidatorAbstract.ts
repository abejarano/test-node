import * as Validator from 'validatorjs';
import { ExceptionBase } from "../exceptions/ExceptionBase";
import { BuildExceptionBase } from "../exceptions/BuildExceptionBase";
import { HttpStatus } from "./HttpStatus";

export class ValidatorAbstract {
    private messageErrors: any;
    public rule: any;

    protected isValid(data: any): Promise<boolean> {
        const validation = new Validator(data, this.rule);

        if (validation.fails()) {
            this.messageErrors = validation.errors.all();

            const exception = new ExceptionBase(
                'Data validation error.',
                'Failed validation for submitted form.',
                HttpStatus.BAD_REQUEST,
                validation.errors.all()
            )
            throw (new BuildExceptionBase(exception));

        }
        return Promise.resolve(true);
    }

}


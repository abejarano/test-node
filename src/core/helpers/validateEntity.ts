import { validate } from "class-validator";
import { ExceptionBase } from "../exceptions/ExceptionBase";
import { BuildExceptionBase } from "../exceptions/BuildExceptionBase";

export default async (entity: object) => {
    const erro = await validate(entity);
    if (erro.length === 0) {
        return;
    }
    const key = Object.keys(erro[0].constraints)[0];

    const exception = new ExceptionBase(
        erro[0].constraints[key],
        'I put an exception in the database layer. Specifically in the field ' + erro[0].property
    )
    throw (new BuildExceptionBase(exception));

}

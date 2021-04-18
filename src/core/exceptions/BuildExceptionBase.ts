import { ExceptionBase } from "./ExceptionBase";
import { Response } from "express";

export class BuildExceptionBase {
    private _exception: ExceptionBase

    constructor(exception: ExceptionBase) {
        this._exception = exception;
    }

    render(res: Response): Response {
        return res.status(this._exception.httpCode).jsonp(this._exception.toJSON);
    }
}

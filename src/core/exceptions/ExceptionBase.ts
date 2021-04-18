export class ExceptionBase {
    private readonly _message: string;
    private readonly _reason: string;
    private readonly _httpCode: number;
    private readonly _data: any;

    constructor(message: string, reason: string, httpCode = null, data: any = []) {
        this._message = message;
        this._reason = reason;
        this._httpCode = (httpCode === null) ? 500 : httpCode;
        this._data = data;
    }

    get data(): any {
        return this._data;
    }
    get httpCode(): number {
        return this._httpCode;
    }
    get reason(): string {
        return this._reason;
    }
    get message(): string {
        return this._message;
    }

    get toJSON() {
        return {
            message: this.message,
            reason: this.reason,
            data: this.data
        }
    }
}

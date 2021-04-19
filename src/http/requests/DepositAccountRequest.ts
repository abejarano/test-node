import { ValidatorAbstract } from "../../core/http/ValidatorAbstract";
import { IValidator } from "../../core/http/RequestInterface";

export class DepositAccountRequest extends ValidatorAbstract implements IValidator {
    public setRule() {
        this.rule = {
            account_id: 'required',
            amount: 'required',
        }
    }

    async validate(data: any): Promise<boolean> {
        this.setRule();
        return await this.isValid(data);
    }
}

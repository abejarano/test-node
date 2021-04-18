import { ValidatorAbstract } from "../../core/http/ValidatorAbstract";
import { IValidator } from "../../core/http/RequestInterface";

export class CreateAccountRequest extends ValidatorAbstract implements IValidator{
    public setRule() {
        this.rule = {
            name: 'required',
            cpf: 'required',
            date_birth: 'required',
        }
    }

    async validate(data: any): Promise<boolean> {
        this.setRule();
        return await this.isValid(data);
    }
}

import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { CreateAccountRequest } from "../requests/CreateAccountRequest";

@controller('/api/v1/accounts')
export class AccountsController {

    @httpPost("/create")
    async createAccount(@request() req: Request, @response() res: Response)
    {
        try {
            const data = req.body;
            const validateRequest = new CreateAccountRequest();
            await validateRequest.validate(data);
            return res.json('Conta cadastrada com sucesso');
        } catch (e) {
            return e.render(res);
        }

    }
}

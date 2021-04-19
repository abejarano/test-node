import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { CreateAccountRequest } from "../requests/CreateAccountRequest";
import { inject } from "inversify-props";
import { ClientRepository } from "../../repositories/ClientsRepository";
import { Clients } from "../../entity/Clients";
import { HttpStatus } from "../../core/http/HttpStatus";
import { BuildExceptionBase } from "../../core/exceptions/BuildExceptionBase";

@controller('/api/v1/accounts')
export class AccountsController {
    @inject() clientRepository: ClientRepository;

    @httpPost("/create")
    async createAccount(@request() req: Request, @response() res: Response)
    {
        try {
            const data = req.body;
            const validateRequest = new CreateAccountRequest();
            await validateRequest.validate(data);

            const client = await this.clientRepository.findByCpf(data.cpf);

            if (client instanceof Clients) {
                return res.status(HttpStatus.BAD_REQUEST).json('O cpf informado já está cadastrado');
            }
            await this.clientRepository.save(data);

            return res.json('Conta cadastrada com sucesso');
        } catch (e) {
            if (e instanceof BuildExceptionBase)
                return e.render(res);

            console.log(e);
        }

    }
}

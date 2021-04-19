import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { CreateAccountRequest } from "../requests/CreateAccountRequest";
import { ClientRepository } from "../../repositories/ClientsRepository";
import { Clients } from "../../entity/Clients";
import { HttpStatus } from "../../core/http/HttpStatus";
import { BuildExceptionBase } from "../../core/exceptions/BuildExceptionBase";
import { getCustomRepository } from "typeorm";
import { AccountsRepository } from "../../repositories/AccountsRepository";

@controller('/api/v1/accounts')
export class AccountsController {
    private clientRepository = getCustomRepository(ClientRepository);
    private accountRepository = getCustomRepository(AccountsRepository);

    @httpPost("/create")
    async createAccount(@request() req: Request, @response() res: Response)
    {
        try {
            const data = req.body;
            const validateRequest = new CreateAccountRequest();
            await validateRequest.validate(data);

            let client = await this.clientRepository.findByCpf(data.cpf);

            if (client instanceof Clients) {
                return res.status(HttpStatus.BAD_REQUEST).json('O cpf informado já está cadastrado');
            }
            client = await this.clientRepository.save(data);

            const account = await this.accountRepository.save({client_id: client.id, account_type: 'CORRENTE'});

            return res.status(HttpStatus.CREATED).json({message: 'Conta cadastrada com sucesso', data: account});
        } catch (e) {
            if (e instanceof BuildExceptionBase)
                return e.render(res);
            console.log(e);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Erro na sua requisição');
        }
    }
}

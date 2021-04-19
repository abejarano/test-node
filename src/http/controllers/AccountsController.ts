import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { CreateAccountRequest } from "../requests/CreateAccountRequest";
import { ClientRepository } from "../../repositories/ClientsRepository";
import { Clients } from "../../entity/Clients";
import { HttpStatus } from "../../core/http/HttpStatus";
import { BuildExceptionBase } from "../../core/exceptions/BuildExceptionBase";
import { getCustomRepository } from "typeorm";
import { AccountsRepository } from "../../repositories/AccountsRepository";
import { DepositAccountRequest } from "../requests/DepositAccountRequest";
import { Accounts } from "../../entity/Accounts";
import { TransactionsRepository } from "../../repositories/TransactionsRepository";

@controller('/api/v1/accounts')
export class AccountsController {
    private clientRepository = getCustomRepository(ClientRepository);
    private accountRepository = getCustomRepository(AccountsRepository);
    private transactionRepository = getCustomRepository(TransactionsRepository);

    @httpPost("/create")
    async createAccount(@request() req: Request, @response() res: Response) {
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

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Erro na sua requisição');
        }
    }

    @httpPost("/deposit")
    async depositAccount(@request() req: Request, @response() res: Response) {
        try {
            const data = req.body;
            const validateRequest = new DepositAccountRequest();
            await validateRequest.validate(data);

            const account = await this.accountRepository.findById(data.account_id);
            if (!(account instanceof Accounts)) {
                return res.status(HttpStatus.BAD_REQUEST).json('O numero de conta não esstá cadastrado.');
            }

            await this.transactionRepository.save({
                account: account,
                amount: data.amount,
                type_transaction: 'DEPOSITO'
            });

            await this.accountRepository.update(account.id, {balance: account.balance + data.amount});

            return res.status(HttpStatus.OK).json({message: 'Depósito cadastrado com sucuesso.'});

        } catch (e) {
            if (e instanceof BuildExceptionBase)
                return e.render(res);

            console.log(e);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Erro na sua requisição');
        }
    }

    @httpGet("/balance/:id")
    async balanceAccount(@request() req: Request, @response() res: Response) {
        const account = await this.accountRepository.findById(parseInt(req.params.id));
        if (!(account instanceof Accounts)) {
            return res.status(HttpStatus.BAD_REQUEST).json('O numero de conta não esstá cadastrado.');
        }

        return res.status(HttpStatus.OK).json({balance: account.balance});
    }
}

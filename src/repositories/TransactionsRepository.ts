import { EntityRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Transactions } from "../entity/Transactions";
import validateEntity from "../core/helpers/validateEntity";
import * as moment from "moment";

@EntityRepository(Transactions)
export class TransactionsRepository extends Repository<Transactions> {
    async save(attr: any) {
        const date = moment();
        attr.date_transaction = date.toDate();

        const transaction = Object.assign(new Transactions(), attr);
        await validateEntity(transaction);
        await this.insert(transaction);

        return transaction;
    }
}

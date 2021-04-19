import { Repository } from "typeorm/repository/Repository";
import { Accounts } from "../entity/Accounts";
import validateEntity from "../core/helpers/validateEntity";
import { EntityRepository } from "typeorm";

@EntityRepository(Accounts)
export class AccountsRepository extends Repository<Accounts> {
    async save(attr: any) {

        const account = Object.assign(new Accounts(), attr);

        await validateEntity(account);
        await this.insert(account);

        return account;
    }
}

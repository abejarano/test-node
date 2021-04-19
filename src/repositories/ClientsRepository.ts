import { EntityRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Clients } from "../entity/Clients";
import validateEntity from "../core/helpers/validateEntity";
import * as moment from 'moment';

@EntityRepository(Clients)
export class ClientRepository extends Repository<Clients> {

    async save(attr: any) {
        let formattedDate = moment(attr.date_birth, 'YYYY-MM-DD');
        attr.date_birth = formattedDate.toDate();
        const client = Object.assign(new Clients(), attr);

        await validateEntity(client);
        await this.insert(client);
        return client;
    }

    async findByCpf(cpf: string) {
        return this.findOne({cpf});
    }

}

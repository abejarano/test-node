import { EntityRepository, Repository } from "typeorm";
import { Clients } from "../entity/Clients";
import validateEntity from "../core/helpers/validateEntity";

@EntityRepository(Clients)
export class ClientRepository extends Repository<Clients> {

    async save(attr: any) {
        const client = Object.assign(new Clients(), attr);

        await validateEntity(client);
        await this.insert(client);

        return client;
    }

    async findByCpf(cpf: string): Promise<Clients | null> {
        return await this.findOne({cpf});
    }

}

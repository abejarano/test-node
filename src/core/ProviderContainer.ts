import { container } from "inversify-props";
import { ClientRepository } from "../repositories/ClientsRepository";

export default () => {
    container.bindTo(ClientRepository);

    return container;
}

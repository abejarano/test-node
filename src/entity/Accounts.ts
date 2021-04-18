import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "./Clients";
import { Transactions } from "./Transactions";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "float"
    })
    balance: number

    @Column({
        default: 4,
        type: "integer"
    })
    withdrawal_limit: number

    @Column({
        type: "character varying",
        length: 10,
    })
    account_type: string

    @Column({
        default: false
    })
    is_active: boolean;

    @ManyToOne(() => Clients, client => client.id)
    client_id: Clients;

    @OneToMany( () => Transactions, transaction => transaction.id)
    transactions: Transactions
}

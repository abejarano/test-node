import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./Accounts";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column('timestamp with time zone')
    date_transaction: Date;

    @OneToOne( () => Accounts, account => account.id)
    account: Accounts;
}

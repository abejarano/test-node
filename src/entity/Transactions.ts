import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./Accounts";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "float"
    })
    amount: number;

    @Column('timestamp with time zone')
    date_transaction: Date;

    @Column()
    type_transaction: string

    @ManyToOne( () => Accounts, account => account.id)
    account: Accounts;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./Accounts";

@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        type: "character varying"
    })
    name: string;

    @Column({
        unique: true,
        length: 14,
        type: "character varying"
    })
    cpf: string;

    @Column()
    date_birth: Date

    @OneToMany(() => Accounts, account => account.id)
    accounts: Accounts

}

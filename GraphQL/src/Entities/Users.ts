import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";


@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: String;

    @Column()
    username!: string;

    @Column()
    password!: string;
}
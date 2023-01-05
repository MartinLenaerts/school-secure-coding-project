import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | null = null;

    @Column()
    firstname: string;

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    passwordHash: string

    constructor(firstname: string, lastname: string, email: string, passwordHash: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.passwordHash = passwordHash;
    }
}
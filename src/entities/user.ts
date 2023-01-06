import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ValidationError} from "../errors/ValidationError";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column({
        nullable: false
    })
    email!: string;

    @Column()
    passwordHash!: string;

    @BeforeInsert()
    @BeforeUpdate()
    checkRequiredProperties() {
        if (!this.email || this.email === "") {
            throw new ValidationError("The email is required", this, "email");
        }
    }
}
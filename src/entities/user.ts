import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstname?: string;

    @Column()
    lastname?: string;

    @Column({
        transformer: {
            from(value: string) {
                return value.toLowerCase();
            },
            to(value: string) {
                return value.toLowerCase();
            },
        },
    })
    @IsNotEmpty()
    email?: string;

    @Column()
    passwordHash?: string;
}
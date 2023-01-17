import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, validate} from "class-validator";
import {UniqueInColumn} from "../decorators/UniqueInColumn";
import {compare, genSalt, hash} from "bcrypt";
import {SetPasswordDTO} from "../DTO/SetPasswordDTO";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

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
    @UniqueInColumn()
    email!: string;

    @Column()
    passwordHash!: string;


    async setPassword(password: string, confirmation: string) {
        const dto = new SetPasswordDTO();
        dto.password = password;
        dto.confirmation = confirmation;
        const [error] = await validate(dto);
        if (error) {
            throw error;
        }

        const salt = await genSalt();
        this.passwordHash = await hash(dto.password, salt);
    }

    async isPasswordValid(password: string) {
        return await compare(password, this.passwordHash);
    }
}
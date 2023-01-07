import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, ValidationError} from "class-validator";
import {UniqueInColumn} from "../decorators/UniqueInColumn";
import {compare, genSalt, hash} from "bcrypt";
import {SetPasswordDTO} from "../DTO/SetPasswordDTO";
import {entropy} from "../lib/passwordEntropy";

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

    async setPassword(dto: SetPasswordDTO) {
        if (dto.password != dto.confirmation || entropy(dto.password) < 80) {
            throw new ValidationError();
        }

        const salt = await genSalt();
        this.passwordHash = await hash(dto.password, salt);
    }

    async isPasswordValid(password: string) {
        return await compare(password, this.passwordHash);
    }
}
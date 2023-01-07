import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, ValidationError} from "class-validator";
import {UniqueInColumn} from "../decorators/UniqueInColumn";
import {genSalt, hash} from "bcrypt";
import {SetPasswordDTO} from "../DTO/SetPasswordDTO";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
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
        if (dto.password != dto.confirmation) {
            throw new ValidationError();
        }

        const salt = await genSalt();
        this.passwordHash = await hash(dto.password, salt);
    }
}
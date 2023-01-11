import {Match} from "../decorators/Match";
import {Entropy} from "../decorators/Entropy";

export class SetPasswordDTO {

    @Entropy(80)
    @Match('confirmation')
    password!: string;

    confirmation!: string;
}
export class SetPasswordDTO{
    password: string;

    confirmation: string;

    constructor(password: string, confirmation: string) {
        this.password = password;
        this.confirmation = confirmation;
    }
}
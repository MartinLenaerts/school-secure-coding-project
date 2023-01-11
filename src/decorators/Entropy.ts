import {
    registerDecorator,
    ValidationArguments,
} from 'class-validator';
import {entropy} from "../lib/passwordEntropy";

export function Entropy(property?: number) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "Entropy",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
                message: `password is not secure`,
            },
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const [entropyMinValue] = args.constraints;
                    
                    return entropy(value) > entropyMinValue;
                }
            },
        });
    };
}
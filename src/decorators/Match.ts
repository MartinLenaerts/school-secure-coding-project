import {
    registerDecorator,
    ValidationArguments,
} from 'class-validator';

export function Match(property?: string) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "Match",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
                message: `password and confirmation doesn't match`,
            },
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as never)[relatedPropertyName];

                    return value === relatedValue;
                }
            },
        });
    };
}
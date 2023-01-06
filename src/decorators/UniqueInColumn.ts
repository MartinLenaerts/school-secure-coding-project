import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import {User} from "../entities/user";
import {dataSource} from "../lib/datasource";

export function UniqueInColumn(property?: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'UniqueInColumn',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
                message: `${propertyName} already exists`,
            },
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    if(!dataSource.isInitialized){
                        await dataSource.initialize();
                    }

                    return dataSource.manager.find(User, { where: { email: value as string } }).then(([user]) => !user);
                },
            },
        });
    };
}
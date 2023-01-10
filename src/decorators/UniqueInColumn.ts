import {registerDecorator} from "class-validator";
import {User} from "../entities/user";
import {dataSource} from "../lib/datasource";

export function UniqueInColumn(property?: string) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'UniqueInColumn',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
                message: `${propertyName} already exists`,
            },
            validator: {
                async validate(value: string) {
                    if(!dataSource.isInitialized){
                        await dataSource.initialize();
                    }

                    return dataSource.manager.find(User, { where: { email: value as string } }).then(([user]) => !user);
                },
            },
        });
    };
}
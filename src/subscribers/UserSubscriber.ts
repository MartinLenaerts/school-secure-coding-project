import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from "typeorm";
import {User} from "../entities/user";
import {validate} from 'class-validator';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {
        const [error] = await validate(event.entity);

        if (error) {
            throw error;
        }
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        const [error] = await validate(event.databaseEntity);

        if (error) {
            throw error;
        }
    }
}
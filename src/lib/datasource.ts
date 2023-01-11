import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "../entities/user";
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME} from "./dotenv";
import {UserSubscriber} from "../subscribers/UserSubscriber";

export const dataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [User],
    synchronize: true,
    logging: false,
    subscribers: [UserSubscriber]
});
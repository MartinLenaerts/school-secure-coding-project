import {config} from 'dotenv';

const env = process.env.NODE_ENV == "test" ? ".test" : "";

config({path:`.env${env}`});

const getOrThrow = (name: string): string => {
    const envVar = process.env[name];

    if (typeof envVar == undefined) {
        throw `Undefined variable ${name}`;
    }

    return "" + envVar;
};

export const DB_HOST = getOrThrow("DB_HOST");
export const DB_PORT = parseInt(getOrThrow("DB_PORT"), 10);
export const DB_USERNAME = getOrThrow("DB_USERNAME");
export const DB_PASSWORD = getOrThrow("DB_PASSWORD");
export const DB_DATABASE = getOrThrow("DB_DATABASE");
export const FASTIFY_ADDR = getOrThrow("FASTIFY_ADDR");
export const FASTIFY_PORT = parseInt(getOrThrow("FASTIFY_PORT"), 10);
export const FASTIFY_LOGGING = getOrThrow("FASTIFY_LOGGING") == "true";


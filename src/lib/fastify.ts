import fastify, {RouteOptions} from 'fastify';
import {FASTIFY_LOGGING} from './dotenv';
import {routes} from "../routes";

export const server = fastify({logger: FASTIFY_LOGGING})
    .addHook('onRoute', assertsResponseSchemaPresenceHook)
    .register(routes, {prefix: '/'});

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema?.response) {
        throw new Error(`No response schema found for route ${routeOptions.url}`);
    }
}
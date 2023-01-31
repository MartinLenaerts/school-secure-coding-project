import fastify, {FastifyError, RouteOptions} from 'fastify';
import {FASTIFY_LOGGING} from './dotenv';
import {routes} from "../routes";
import {errorHandler} from "./errorHandler";

export const server = fastify({
    logger: FASTIFY_LOGGING,
    ajv: {
        customOptions: {
            removeAdditional: false
        }
    }
})
    .addHook('onRoute', assertsResponseSchemaPresenceHook)
    .addHook('onRoute', assertsValidationSchemaPresenceHook)
    .setErrorHandler(errorHandler)
    .register(routes, {prefix: '/'});

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema?.response) {
        throw new Error(`No response schema found for route ${routeOptions.url}`);
    }
}

export function assertsValidationSchemaPresenceHook(routeOptions: RouteOptions) {
    if (!routeOptions.schema?.body && !routeOptions.schema?.params && !routeOptions.schema?.params) {
        throw Error(`No query schema found for route ${routeOptions.url}`);
    }
}
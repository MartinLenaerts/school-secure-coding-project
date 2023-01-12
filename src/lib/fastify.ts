import fastify, {RouteOptions} from 'fastify';
import { webApiRoutes } from '../routes/web-api/web-api-routes';
import { FASTIFY_LOGGING } from './dotenv';

export const server = fastify({ logger: FASTIFY_LOGGING })
    .addHook('onRoute', assertsResponseSchemaPresenceHook)
    .register(webApiRoutes, { prefix: '/web-api' });

export function assertsResponseSchemaPresenceHook (routeOptions: RouteOptions) {

}



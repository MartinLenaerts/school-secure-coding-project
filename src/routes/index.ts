import {FastifyInstance} from "fastify";
import {webApi} from "./web-api";

export async function routes(fastify: FastifyInstance) {
    fastify.register(webApi, {prefix: '/web-api'});
}
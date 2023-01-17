import {FastifyInstance} from "fastify";
import {users} from "./users";

export async function webApi (fastify : FastifyInstance) {
    fastify.register(users, {prefix: '/users'});
}
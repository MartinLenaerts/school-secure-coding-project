import {FastifyInstance} from "fastify";
import {CreateUserRequestBody as QuerystringSchemaInterface} from "../../types/userRequest";
import * as CreateUserRequestBody from "../../schemas/userRequest.json";
import {dataSource} from "../../lib/datasource";
import {User} from "../../entities/user";

export async function users(fastify: FastifyInstance) {
    fastify.post<{
        Body: QuerystringSchemaInterface
    }>('/', {
        schema: {
            body: CreateUserRequestBody
        }
    }, async (request, reply) => {
        const {email, firstname, lastname, password, passwordConfirmation} = request.body;

        const repo = dataSource.getRepository(User);
        const user = new User();

        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;

        await user.setPassword(password, passwordConfirmation);

        await repo.save(user);


        reply.status(200);
    });
}
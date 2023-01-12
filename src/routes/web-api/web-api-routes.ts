import {FastifyPluginCallback} from "fastify";
import {CreateUserRequestBody as QuerystringSchemaInterface} from "../../types/userRequest";
import * as CreateUserRequestBody from "../../schemas/userRequest.json";
import {dataSource} from "../../lib/datasource";
import {User} from "../../entities/user";

export const webApiRoutes: FastifyPluginCallback = (fastify, options, done) => {
    fastify.post<{
        Querystring: QuerystringSchemaInterface
    }>('/users', {
        schema: {
            querystring: CreateUserRequestBody
        }
    }, async (request, reply) => {
        const {email, firstname, lastname, password, passwordConfirmation} = request.query;

        const repo = dataSource.getRepository(User);
        const user = new User();

        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;

        await user.setPassword(password, passwordConfirmation);

        await repo.save(user);


        reply.status(200);
    });


    fastify.get('/users', (request, reply) => {
        reply.send("YES");
    });

    done();
};
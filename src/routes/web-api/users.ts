import {FastifyInstance} from "fastify";
import {CreateUserRequestBody as QuerystringSchemaInterface} from "../../types/userRequest";
import * as CreateUserRequestBody from "../../schemas/userRequest.json";
import * as CreateUserResponseBody from "../../schemas/userResponse.json";
import {dataSource} from "../../lib/datasource";
import {User} from "../../entities/user";

export async function users(fastify: FastifyInstance) {
    fastify.post<{
        Body: QuerystringSchemaInterface
    }>('/', {
        schema: {
            body: CreateUserRequestBody,
            response: {201: CreateUserResponseBody}
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

        reply.status(201);
    });
/*
    fastify.get<{
        Query: { id:string }
    }>('/:id', {
        schema: {
            response: {201: CreateUserResponseBody}
        }
    }, async (request, reply) => {

        const repo = dataSource.getRepository(User);
        const user = await repo.findOneBy({id: request.id});

        reply.status(200).send({
            email: user?.email,
            lastname: user?.lastname,
            firstname: user?.firstname,
            id: user?.id
        });
    });

    fastify.get('/', {
        schema: {
            response: {201: CreateUserResponseBody}
        }
    }, async (request, reply) => {

        const repo = dataSource.getRepository(User);
        const users = await repo.find();

        reply.status(200).send(users);
    });*/
}
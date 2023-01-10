import fastify from 'fastify'
import * as CreateUserRequestBody from "../schemas/userRequest.json";
import {CreateUserRequestBody as QuerystringSchemaInterface} from '../types/userRequest'
import {dataSource} from "./datasource";
import {User} from "../entities/user";
import {SetPasswordDTO} from "../DTO/SetPasswordDTO";

const server = fastify()

server.post<{
    Querystring: QuerystringSchemaInterface
}>('/web-api/users', {
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

    await user.setPassword(new SetPasswordDTO(password, passwordConfirmation))

    await repo.save(user)


    reply.send("ok");
})

export {
    server
}
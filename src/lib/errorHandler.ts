import {FastifyReply, FastifyRequest} from "fastify";
import {ValidationError} from "class-validator";
import {EntityNotFoundError} from "typeorm";

export function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-prototype-builtins
    let code = error.hasOwnProperty("statusCode") ? error.statusCode : 500 ;
    let message = error.message;

    if (error instanceof ValidationError) {
        code = 400;
        message = "Invalid parameter";
    } else if (error instanceof EntityNotFoundError) {
        code = 404;
        message = "Instance not found";
    }

    reply.status(Number(code)).send({message: message});
}
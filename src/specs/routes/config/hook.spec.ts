import fastify, {FastifyInstance} from "fastify";
import {assertsResponseSchemaPresenceHook, assertsValidationSchemaPresenceHook} from "../../../lib/fastify";
import {expect} from "chai";

describe('Fastify Hooks', function () {
    describe('onRoute hook', function () {
        it("should raise error if route haven't response schema", async function () {
            const server = fastify()
                .addHook('onRoute', assertsResponseSchemaPresenceHook).register(async (fastify: FastifyInstance) => {
                    fastify.post("/test", () => true);
                });

            await expect(server).to
                .eventually.be.rejected
                .and.deep.include({
                    message: 'No response schema found for route /test',
                });
        });

        it("should raise error if route haven't query schema", async function () {
            const server = fastify()
                .addHook('onRoute', assertsValidationSchemaPresenceHook).register(async (fastify: FastifyInstance) => {
                    fastify.post("/test", () => true);
                });

            await expect(server).to
                .eventually.be.rejected
                .and.deep.include({
                    message: 'No query schema found for route /test',
                });
        });
    });
});
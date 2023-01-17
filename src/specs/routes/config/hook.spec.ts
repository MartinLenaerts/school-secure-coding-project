import {server} from "../../../lib/fastify";
import {expect} from "chai";

describe('Fastify Hooks', function () {
    describe('onRoute hook', function () {
        it("should raise error if route haven't schema",async function () {
            //expect(server.get('/test', (request,reply) => console.log(request,reply))).to.be.rejected;
        });
    });
});
import {server} from '../../../lib/fastify';
import {expect} from "chai";

describe('/web-api/users', function () {
    describe('POST #create', function () {
        it('should register the user', async function () {
            const response = await server.inject({
                url: `/web-api/users`, method: 'POST', query: {
                    firstname: "john",
                    lastname: "doe",
                    email: "john.doe@gmail.com",
                    password: "verystrongpassword@123456789",
                    passwordConfirmation: "verystrongpassword@123456789"
                }
            });

            expect(response.statusCode).eq(200);
        });
    });
});
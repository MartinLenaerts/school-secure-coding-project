import {server} from '../../../lib/fastify';
import {expect} from "chai";

describe('/web-api/users', function () {
    describe('POST #create', function () {
        let userQueryString = {
            firstname: "john",
            lastname: "doe",
            email: "john.doe@gmail.com",
            password: "verystrongpassword@123456789",
            passwordConfirmation: "verystrongpassword@123456789"
        };

        beforeEach(function () {
            userQueryString = {
                firstname: "john",
                lastname: "doe",
                email: "john.doe@gmail.com",
                password: "verystrongpassword@123456789",
                passwordConfirmation: "verystrongpassword@123456789"
            };
        });

        it('should register the user', async function () {
            const response = await server.inject({
                url: `/web-api/users`, method: 'POST', query: userQueryString
            });

            console.log(response.body);

            expect(response.statusCode).eq(200);
        });

        describe('Missing parameters', function () {
            for (const parameter of Object.keys(userQueryString)) {
                it("should raise error if " + parameter + " is missing", async function () {
                    delete userQueryString[parameter as keyof typeof userQueryString];

                    const response = await server.inject({
                        url: `/web-api/users`, method: 'POST', query: userQueryString
                    });

                    expect(response.statusCode).eq(400);
                    expect(JSON.parse(response.body).message).eq("querystring must have required property '" + parameter + "'");
                });
            }

        });
    });
});
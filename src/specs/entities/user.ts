import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import {dataSource} from "../../lib/datasource";
import {User} from "../../entities/user";
import {QueryFailedError} from "typeorm";

chai.use(chaiAsPromised)

describe('User', function () {
    before(async function () {
        await dataSource.initialize()
    })

    beforeEach(async function () {
        const userRepository = dataSource.getRepository(User)
        await userRepository.clear();
    })

    describe('validations', function () {
        it('should create a new User in database', async () => {
            const userRepository = dataSource.getRepository(User);

            const user = new User();

            user.firstname = "firstname";
            user.lastname = "lastname";
            user.email = "test@test.fr";
            user.passwordHash = "123456";

            await userRepository.save(user);

            await chai.expect(user).haveOwnProperty('id').and.be.a('number');
        })

        it('should raise error if email is missing', async function () {
            // hint to check if a promise fails with chai + chai-as-promise:

            const userRepository = dataSource.getRepository(User);

            const user = new User();

            user.firstname = "firstname";
            user.lastname = "lastname";
            user.passwordHash = "123456";

            const promise = userRepository.save(user);

            await chai.expect(promise).to.eventually.be.rejectedWith(QueryFailedError, 'null value in column "email" of relation "user" violates not-null constraint')
        })
    })
})

import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import {dataSource} from "../../lib/datasource";
import {User} from "../../entities/user";
import {expect} from "chai";
import {Repository} from "typeorm";

chai.use(chaiAsPromised)

describe('User', function () {
    let repo: Repository<User>;

    before(async function () {
        await dataSource.initialize();
        repo = dataSource.getRepository(User);
    })

    beforeEach(async function () {
        await repo.clear();
    })

    describe('validations', function () {
        it('should create a new User in database', async () => {

            const user = new User();

            user.firstname = "firstname";
            user.lastname = "lastname";
            user.email = "test@test.fr";
            user.passwordHash = "123456";

            await repo.save(user);

            await expect(user).haveOwnProperty('id').and.be.a('number');
        })

        it('should raise error if email is missing', async function () {
            // hint to check if a promise fails with chai + chai-as-promise:


            const user = new User();

            user.firstname = "firstname";
            user.lastname = "lastname";
            user.passwordHash = "123456";


            await expect(repo.save(user)).to.eventually.be.rejected.and.deep.include({
                target: user,
                property: 'email',
                constraints: {isNotEmpty: 'email should not be empty'}
            })

        })
    })
})

import {entropy} from "../../lib/passwordEntropy";
import {expect} from "chai";

const doubleToInt = (value: number): number => {
    return parseInt(String(value * 100), 10) / 100
}
describe('Entropy', function () {
    it('should have low entropy', async function () {
        expect(doubleToInt(entropy("123456"))).eq(19.93);
    })

    it('should have high entropy', async function () {
        expect(doubleToInt(entropy("azerty12345678@"))).eq(91.31);
    })
})
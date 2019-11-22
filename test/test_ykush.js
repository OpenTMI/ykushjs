// 3rd party modules
const chai = require('chai');
const {stub} = require('sinon');
const chaiAsPromised = require('chai-as-promised');
// application modules
const {Ykush} = require('../src');

chai.use(chaiAsPromised);
const {expect} = chai;


describe('Ykush', function () {
    const logger = {debug: () => {}, silly: () => {}};
    beforeEach(function () {
        stub(Ykush, 'execa');
        Ykush.execa.resolves({stdout: ''});
    });
    afterEach(function () {
        Ykush.execa.restore();
    });
    it('is ok', function () {
        const obj = new Ykush('123', {logger});
        expect(obj).to.be.ok;
    });
    it('powerAllOn', async function () {
        const ykush = new Ykush('123', {logger});
        await ykush.powerAllOn();
        expect(Ykush.execa.calledOnceWith('ykushcmd', ['-s', '123', '-u'])).to.be.true;
    });
    it('powerAllOff', async function () {
        const ykush = new Ykush('123', {logger});
        await ykush.powerAllOff();
        expect(Ykush.execa.calledOnceWith('ykushcmd', ['-s', '123', '-d'])).to.be.true;
    });
    it('powerOn', async function () {
        const ykush = new Ykush('123', {logger});
        await ykush.powerOn({channel: 1});
        expect(Ykush.execa.calledOnceWith('ykushcmd', ['-s', '123', '-u', '1'])).to.be.true;
    });
    it('powerOff', async function () {
        const ykush = new Ykush('123', {logger});
        await ykush.powerOff({channel: 1});
        expect(Ykush.execa.calledOnceWith('ykushcmd', ['-s', '123', '-d', '1'])).to.be.true;
    });
});

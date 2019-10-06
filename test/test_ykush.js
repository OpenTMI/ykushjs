// 3rd party modules
const _ = require('lodash');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
// application modules
const {Ykush} = require('../src');

chai.use(chaiAsPromised);
const {expect} = chai;


describe('Ykush', () => {
  const logger = {debug: () => {}};
  it('is ok', () => {
    const obj = new Ykush('123', {logger});
    expect(obj).to.be.ok;
  });
});

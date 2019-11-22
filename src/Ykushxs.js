// app modules
const Ykush = require('./Ykush');


module.exports = class Ykushxs extends Ykush {
    get _args() { // eslint-disable-line class-methods-use-this
        return ['ykushxs'];
    }

    async powerOn({channel}) {
        this._validateChannel(channel);
        const args = ['ykushxs', '-s', this._serialNumber, '-u'];
        return this._runYkushCmd(args);
    }

    async powerOff({channel}) {
        this._validateChannel(channel);
        const args = ['ykushxs', '-s', this._serialNumber, '-d'];
        return this._runYkushCmd(args);
    }
};

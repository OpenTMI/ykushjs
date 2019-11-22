// 3rd party modules
const execa = require('execa');
const invariant = require('invariant');

class Ykush {
    constructor(serialNumber, {logger}) {
        this._serialNumber = serialNumber;
        this.logger = logger;
        this._channelCount = 3;
    }

    get _ykushcmd() { // eslint-disable-line class-methods-use-this
        /**
         * get ykushcmd - should be available in $PATH
         */
        return 'ykushcmd';
    }

    get _args() { // eslint-disable-line class-methods-use-this
        return [];
    }

    async _runYkushCmd(args) {
        const cmd = this._ykushcmd;
        this.logger.debug(`ykush cmd: 'cmd ${args.join(' ')}'`);
        const {stdout} = await Ykush.execa(cmd, args);
        this.logger.silly(`stdout: ${stdout}`);
        return {stdout};
    }

    async powerAllOn() {
        const args = ['-s', this._serialNumber, '-u'];
        return this._runYkushCmd(args);
    }

    async powerAllOff() {
        const args = ['-s', this._serialNumber, '-d'];
        return this._runYkushCmd(args);
    }

    _validateChannel(channel) {
        invariant(channel >= 0, 'invalid channel');
        invariant(channel < this._channelCount, `allowed channels are 0..${this._channelCount}`);
    }

    async powerOn({channel}) {
        this._validateChannel(channel);
        const args = ['-s', this._serialNumber, '-u', `${channel}`];
        return this._runYkushCmd(args);
    }

    async powerOff({channel}) { // eslint-disable-line class-methods-use-this
        this._validateChannel(channel);
        const args = ['-s', this._serialNumber, '-d', `${channel}`];
        return this._runYkushCmd(args);
    }

    async list() {
        const args = [...this._args, '-l'];
        const {stdout} = await this._runYkushCmd(args);
        if (stdout.indexOf('No YKUSH') !== -1) {
            return [];
        }
        return stdout.split('\n').reduce((prev, cur) => {
            const match = cur.match(/Board found with serial number: (.*)/);
            if (match) {
                prev.push({id: match[1]});
            }
            return prev;
        }, []);
    }
}

Ykush.execa = execa;
module.exports = Ykush;

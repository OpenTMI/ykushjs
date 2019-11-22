# ykushjs
Jepkit Ykush module


## Requirements
* node 8, 10 or 12
* `ykushcmd` - should be available in `$PATH` (https://github.com/Yepkit/ykush)

## API

```js
const Ykush = require('Ykush');
const listOfSerialNumbers = Ykush.detect();
const ykush = new Ykush(listOfSerialNumbers[0]);
ykush.powerOn({channel: 0})
     .then(() => ykush
     .powerOff({channel: 0});
```

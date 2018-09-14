# repeater

## about

Repeater allows u to start, stop, and restart repeating invocations of your functions

```js
let queryRepeater = new Repeater(doQuery, 100, true);
```

```js
let queryRepeater = new Repeater(doQuery);
queryRepeater.setPeriod(100);
queryRepeater.start();
```

## simple example

```js
const Repeater = require('function-repeater');

let i = 0;
let add1 = () => i++;
let subtract3 = () => i -= 3;

let accumulation = [];
let accumulate = () => accumulation.push(i);

let repeaterA = new Repeater(add1, 300, true);
let repeaterB = new Repeater(add1, 900, true);
let repeaterC = new Repeater(subtract3, 1800, true);
let repeaterD = new Repeater(subtract3);
let accumulateRepeater = new Repeater(accumulate, 300, true);
setTimeout(() => {
    repeaterA.stop();
    repeaterB.stop();
    repeaterD.start(300);
    accumulate();
}, 2400);
setTimeout(() => {
    repeaterC.stop();
    repeaterD.stop();
    accumulateRepeater.stop();
    console.log(accumulation); // [-1, 0, 1, 3, 4, 5, 4, 5, 6, 3, 3, 0, -3]
}, 3100);
```

### Output explained

```
-1 // +1 (A) +1 (B) -3 (C) @ 0ms
0 // +1 (A) @ 300ms
1 // +1 (A) @ 600ms
3 // +1 (A) +1 (B) @ 900ms
4 // +1 (A) @ 1200ms
5 // +1 (B) @ 1500ms
4 // +1 (A) +1 (B) -3 (C) @ 1800ms
5 // +1 (A) @ 2100ms
6 // +1 (A) @ 2400ms
// A & B stopped, D started @ 2400ms
3 // -3 (D) @ 2400ms
0 // -3 (D) @ 2700ms
-3 // -3 (D) @ 3000ms
// C & D stopped @ 3100ms
```

## api

### `new Repeater(function handler, integer period, boolean start)`

Creates a new repeater that will invoke `handler` every `period` milliseconds. If `period` is omitted, it will default to 0. If `start` is truthy, the repeater will automatically invoke it's `start` method (see below).

### `setHandler(function handler)`

Sets the `handler` which will be invoked when the repeater is started. If the repeater is in progress, the new `handler` will not take affect until the repeater is stopped and restarted.

### `setPeriod(integer period)`

Update's the repeaters `period`. If the repeater is in progress, the new `period` will not take affect until the repeater is stopped and restarted.

### `start(integer period)`

Starts the repeater with the specified `period` or the current `period`. If the repeater is in progress, it is stopped and restarted.

### `stop()`

Stops the repeater.

const Repeater = require('../src/Repeater');

new Repeater(
    (repeater, i) => {
        console.log(i);
        if (i === 10)
            repeater.stop();
    }, 10, true);

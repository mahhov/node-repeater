class Repeater {
    constructor(handler, period, start) {
        this.setHandler(handler);
        this.setPeriod(period);
        this.runFlag = {value: false};
        if (start)
            this.start();
    }

    setHandler(handler) {
        this.handler = handler;
    }

    setPeriod(period) {
        this.period = period;
    }

    start(period) {
        if (period)
          this.setPeriod(period);
        this.stop();
        this.runFlag.value = true;
        Repeater.repeat(this.handler, this.period, this.runFlag);
    }

    stop() {
        this.runFlag.value = false;
    }

    static async repeat(handler, period, runFlag) {
        while (runFlag.value) {
            handler();
            await Repeater.sleep(period);
        }
    }

    static sleep(period) {
        return new Promise(resolve => setTimeout(resolve, period));
    }
}

module.exports = Repeater;

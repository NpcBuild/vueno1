export const CountdownEventName = {//监听事件名称

    START: 'start',

    RUNNING: 'running',

    STOP: 'stop',

}

const CountdownStatus = {//倒计时状态

    RUNNING: 'running',

    STOPED: 'stoped'

}

export function fillZero(num) {//保证取两位数字，只有一位的话补上0

    return `0${num}`.slice(-2);

}

export class Countdown {

    events = {

        // start:[fn,fn]//存放执行函数的数组

    }

    //这三个单位都是毫秒(ms)

    endTime = 0//倒计时结束时间

    step = 0//显示的时间的变化间隔，即this.countdown()的执行间隔

    remainTime = 0//剩余时间

    status = CountdownStatus.STOPED//初始状态为stoped，因为还没开始

    static COUNT_IN_MILLISECOND = 1

    static SECOND_IN_MILLISECOND = 1000 * Countdown.COUNT_IN_MILLISECOND//一秒等于1000毫秒

    static MINUTE_IN_MILLISECOND = 60 * Countdown.SECOND_IN_MILLISECOND//一分钟等于60秒

    static HOUR_IN_MILLISECOND = 60 * Countdown.MINUTE_IN_MILLISECOND

    static DAY_IN_MILLISECOND = 24 * Countdown.HOUR_IN_MILLISECOND

    constructor(endTime, step) {

        this.endTime = endTime

        this.step = step

    }

    on(eventName, eventFn) {//把执行函数存入数组

        if (this.events[eventName]) {

            this.events[eventName].push(eventFn)

        } else {

            this.events[eventName] = [eventFn]

        }

    }

    emit(eventName, eventMsg) {//触发监听事件后，执行对应函数

        if (this.events[eventName]) {

            this.events[eventName].forEach(fn => {

                fn(eventMsg)

            });

        }

    }

    start() {

        this.emit(CountdownEventName.START)

        this.status = CountdownStatus.RUNNING

        this.countdown()

    }

    stop() {

        this.emit(CountdownEventName.STOP)

        this.status = CountdownStatus.STOPED

    }

    countdown() {

        if (this.status === CountdownStatus.RUNNING) {

            this.remainTime = Math.max(this.endTime - Date.now(), 0)//取剩余时间，避免取负数

            this.emit(CountdownEventName.RUNNING, this.parseRemainTime(this.remainTime))

            if (this.remainTime > 0) {

                setTimeout(() => {

                    this.countdown()

                }, this.step)

            } else {

                this.stop()

            }

        }

    }

    parseRemainTime(remainTime) {//把时间戳转化为时间格式

        let time = remainTime

        const days = Math.floor(time / Countdown.DAY_IN_MILLISECOND)

        time = time % Countdown.DAY_IN_MILLISECOND

        const hours = Math.floor(time / Countdown.HOUR_IN_MILLISECOND)

        time = time % Countdown.HOUR_IN_MILLISECOND;

        const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLISECOND)

        time = time % Countdown.MINUTE_IN_MILLISECOND;

        const seconds = Math.floor(time / Countdown.SECOND_IN_MILLISECOND)

        time = time % Countdown.SECOND_IN_MILLISECOND;

        const count = Math.floor(time / Countdown.COUNT_IN_MILLISECOND)

        return {

            days,

            hours,

            minutes,

            seconds,

            count

        }

    }

}



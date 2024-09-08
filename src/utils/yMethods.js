/**
 * 常用工具函数
 */
//判断是否IE浏览器
export function detectIE() {
    return !!window.ActiveXObject || 'ActiveXObject' in window
}

//节流函数，防止短时间多次触发
export function throttle (fn,delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn();
        },delay);
    }
}
export function throttle2(fn, delay = 1000) {
    let timer = null;
    let firstTime = true;

    return function (...args) {
        if (firstTime) {
            // 第一次加载
            fn.apply(this, args);
            return firstTime = false;
        }
        if (timer) {
            // 定时器正在执行中，跳过
            return;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this, args);
        }, delay);
    };
}

//下拉动画
export function animation(obj, target, fn1) {
    // console.log(fn1);
    // fn是一个回调函数，在定时器结束的时候添加
    // 每次开定时器之前先清除掉定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长计算公式  越来越小
        // 步长取整
        var step = (target - obj.scrollTop) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.scrollTop >= target) {
            clearInterval(obj.timer);
            // 如果fn1存在，调用fn
            if (fn1) {
                fn1();
            }
        } else {
            // 每30毫秒就将新的值给obj.left
            obj.scrollTop = obj.scrollTop + step;
        }
    }, 10);
}
let autoScrollTimer
export function autoScroll(speed = 10) {
    if (autoScrollTimer) clearInterval(autoScrollTimer)
    if (speed == 0) return
    autoScrollTimer = setInterval(function () {
        document.documentElement.scrollTop = document.documentElement.scrollTop + 1;
    }, speed)
}
/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
    // 生成 最小值 到 最大值 区间的随机数
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    if (arguments.length === 1) {
        let [length] = arguments
        // 生成指定长度的随机数字，首位一定不是 0
        let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
        return parseInt(nums.join(''))
    } else if (arguments.length >= 2) {
        let [min, max] = arguments
        return random(min, max)
    } else {
        return Number.NaN
    }
}

export function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return null; // null 的情况
    if (obj instanceof Date) return new Date(obj); // 日期对象直接返回一个新的日期对象
    if (obj instanceof RegExp) return new RegExp(obj); // 正则对象直接返回一个新的正则对象
    // 如果循环引用了就用 weakMap 来解决
    if (hash.has(obj)) return hash.get(obj);

    let allDesc = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
    hash.set(obj, cloneObj);

    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] = (typeof obj[key] === 'object' && obj[key] !== null)
            ? deepClone(obj[key], hash)
            : obj[key];
    }
    return cloneObj;
}

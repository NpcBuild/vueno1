/**
 * 常用工具函数
 */

//节流函数，防止短时间多次触发
throttle = function (fn,delay) {
    var timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn();
        },delay);
    }
};

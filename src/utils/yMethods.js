/**
 * 常用工具函数
 */

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

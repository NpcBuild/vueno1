export function timestampToDate(timestamp) {
    // 时间戳为10位需*1000，时间戳为13位不需乘1000
    if (timestamp.length == 10) {
        timestamp = timestamp * 1000
    }
    var date = new Date(Number(timestamp));
    return date
}
export function timestampToTime(timestamp) {
    var date = timestampToDate(timestamp)
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}
export function yfTimestampToTime(timestamp) {
    var date = timestampToDate(timestamp)
    var dateStr = timestampToTime(timestamp)
    var now = new Date()
    if (date.getFullYear() === now.getFullYear()) {
        dateStr = dateStr.slice(5)
        if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
            dateStr = dateStr.slice(6)
        }
    }
    return dateStr;
}
export function timestampToDateStr(timestamp) {
    var date = timestampToDate(timestamp)
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    return Y + M + D;
}

// 为Date原型添加格式化方法
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

// 获取当月第一天是周几
export function weekdayNum() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    // 获取当月第一天是周几
    let firstDay = new Date(year, month, 1);
    let weekday = firstDay.getDay() ; // 0-6 => 0是周日，1是周一
    let weekdayNum = weekday == 0 ? 7 : weekday; // 1-7
    return weekdayNum;
}

// 获取当月天数
export function daysInMonth() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let daysInMonth;
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        daysInMonth = 30;
    } else if (month === 1) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            daysInMonth = 29;
        } else {
            daysInMonth = 28;
        }
    } else {
        daysInMonth = 31;
    }
    return daysInMonth;
}

// 获取当月天数2
export function daysInMonth2() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let nextMonth = new Date(year, month + 1, 1);
    return (nextMonth - 1) / (1000 * 60 * 60 * 24);
}
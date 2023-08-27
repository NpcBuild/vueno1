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
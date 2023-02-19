//加
function floatAdd(arg1, arg2) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
//减
function floatSub(arg1, arg2) {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}
//乘
//javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
function floatMul(arg1, arg2) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
        console.log(e)
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
        console.log(e)
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除
function floatDiv(arg1, arg2) {
    let t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
        console.log(e)
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
        console.log(e)
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
    return floatAdd(this, arg);
}
//给Number类型增加一个sub方法，调用起来更加方便。
Number.prototype.sub = function (arg){
    return floatSub(this, arg);
}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
    return floatMul(this, arg);
}
//给Number类型增加一个accp方法，调用起来更加方便。
Number.prototype.accp = function (arg){
    return floatDiv(this, arg);
}
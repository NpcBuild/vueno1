const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

module.exports = {
    // baseUrl: isPro ? 'http://localhost:8082/' : 'http://localhost:8082/api/'
    baseUrl: isPro ? 'http://localhost:1314/' : 'http://localhost:1314/api/'
}

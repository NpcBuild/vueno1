const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

module.exports = {
    baseUrl: isPro ? 'http://localhost:8082/' : 'http://localhost:8082/api/'
}
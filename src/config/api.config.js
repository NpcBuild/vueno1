const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log('isPro:', isPro);

module.exports = {
    // baseUrl: isPro ? 'http://localhost:8082/' : 'http://localhost:8082/api/'
    baseUrl: process.env.VUE_APP_API_BASE_URL + (isPro ? '' : '/api/')
}

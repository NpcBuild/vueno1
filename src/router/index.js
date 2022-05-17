import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/login/Login'
import logins from '../views/login/logins'
import About from '../views/About'

Vue.use(VueRouter)

const myself = r => require.ensure([], () => r(require('@/pages/me')), 'myBookshelf');

// 精品页
const homeIndex = r => require.ensure([], () => r(require('@/pages/home/index')), 'homeIndex');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        },
        children: [
            {
                path: '/index',
                name: '精选',
                component: homeIndex
            },
            {
                path: '/me',
                name: '我',
                component: myself
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/logins',
        name: 'logins',
        component: logins
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
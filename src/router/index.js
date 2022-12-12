import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/login/Login'
import logins from '../views/login/logins'
import socket from '../views/socket/socket'
import About from '../views/About'
import setting from '../views/setting/setting'

Vue.use(VueRouter)

const myself = r => require.ensure([], () => r(require('@/pages/me')), 'myBookshelf');

// 精品页
const homeIndex = r => require.ensure([], () => r(require('@/pages/home/index')), 'homeIndex');
const chat = r => require.ensure([], () => r(require('@/components/chat/index')), 'chat');
const chat2 = r => require.ensure([], () => r(require('@/components/chat/index2')), 'chat2');
const loading = r => require.ensure([], () => r(require('@/components/loading/index')), 'loading');
const weather = r => require.ensure([], () => r(require('@/components/weather/index')), 'weather');
const pagination = r => require.ensure([], () => r(require('@/components/pagination/index')), 'pagination');
const test = r => require.ensure([], () => r(require('@/components/test/index')), 'test');
const test2 = r => require.ensure([], () => r(require('@/components/test2/index')), 'test2');

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
        path: '/socket',
        name: 'socket',
        component: socket
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    },
    {
        path: '/chat',
        name: 'chat',
        component: chat,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    },
    {
        path: '/chat2',
        name: 'chat2',
        component: chat2,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: setting,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    },
    {
        path: '/loading',
        name: 'loading',
        component: loading
    },
    {
        path: '/weather',
        name: 'weather',
        component: weather
    },
    {
        path: '/pagination',
        name: 'pagination',
        component: pagination
    },
    {
        path: '/test',
        name: 'test',
        component: test
    },
    {
        path: '/test2',
        name: 'test2',
        component: test2
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
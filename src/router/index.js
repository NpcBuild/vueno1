import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Admin from '../views/admin/admin.vue'
import Login from '../views/login/Login'
import logins from '../views/login/logins'
import socket from '../views/socket/socket'
import About from '../views/About'
import setting from '../views/setting/setting'

Vue.use(VueRouter)

const myself = r => require.ensure([], () => r(require('@/pages/me')), 'myBookshelf');

// 精品页
const homeIndex = r => require.ensure([], () => r(require('@/pages/home/index')), 'homeIndex');
const netDisk = r => require.ensure([], () => r(require('@/views/netDisk/netDisk.vue')), 'netDisk');
const music = r => require.ensure([], () => r(require('@/views/music/music.vue')), 'music');
const chat = r => require.ensure([], () => r(require('@/components/chat/index')), 'chat');
const chat2 = r => require.ensure([], () => r(require('@/components/chat/index2')), 'chat2');
const loading = r => require.ensure([], () => r(require('@/components/loading/index')), 'loading');
const weather = r => require.ensure([], () => r(require('@/components/weather/index')), 'weather');
const pagination = r => require.ensure([], () => r(require('@/components/pagination/index')), 'pagination');
const test = r => require.ensure([], () => r(require('@/components/test/expression')), 'test');
const test2 = r => require.ensure([], () => r(require('@/components/test2/index')), 'test2');
const voice = r => require.ensure([], () => r(require('@/components/voice/index')), 'voice');
const video = r => require.ensure([], () => r(require('@/components/videoPlayer/videoPlayer')), 'video');
const video2 = r => require.ensure([], () => r(require('@/components/videoPlayer/video2.vue')), 'video2');
const dailyPlan = r => require.ensure([], () => r(require('@/views/todo/dailyPlan.vue')), 'dailyPlan');
const test3 = r => require.ensure([], () => r(require('@/components/emoji/smileyPreloader.vue')), 'test3');
const test4 = r => require.ensure([], () => r(require('@/components/videoPlayer/videoTest.vue')), 'test4');
const yf = r => require.ensure([], () => r(require('@/components/NPC/yf.vue')), 'yf');

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
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    },
    {
        path: '/netDisk',
        name: 'netDisk',
        component: netDisk,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    },
    {
        path: '/music',
        name: 'music',
        component: music,
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
        path: '/dailyPlan',
        name: 'dailyPlan',
        component: dailyPlan,
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
    // 页签
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
    // 软件图标
    {
        path: '/test2',
        name: 'test2',
        component: test2
    },
    {
        path: '/voice',
        name: 'voice',
        component: voice
    },
    {
        path: '/video',
        name: 'video',
        component: video
    },
    {
        path: '/video2',
        name: 'video2',
        component: video2
    },
    {
        path: '/test3',
        name: 'test3',
        component: test3
    },
    {
        path: '/test4',
        name: 'test4',
        component: test4
    },
    {
        path: '/yf',
        name: 'yf',
        component: yf
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
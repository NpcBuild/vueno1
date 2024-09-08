import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Admin from '../views/admin/admin.vue'
import Login from '../views/login/Login'
import logins from '../views/login/logins'
import socket from '../views/socket/socket'
import About from '../views/About'
import set from '../views/setting/index'
import setting from '../views/setting/setting'

Vue.use(VueRouter)

const myself = r => require.ensure([], () => r(require('@/pages/me')), 'myBookshelf');

// 精品页
const homeIndex = r => require.ensure([], () => r(require('@/pages/home/index')), 'homeIndex');
const netDisk = r => require.ensure([], () => r(require('@/views/netDisk/netDisk.vue')), 'netDisk');
const music = r => require.ensure([], () => r(require('@/views/music/music.vue')), 'music');
const chat = r => require.ensure([], () => r(require('@/components/chat/index')), 'chat');
const chat2 = r => require.ensure([], () => r(require('@/components/chat/index2')), 'chat2');

// const loading = () => import('@/components/loading/index');
// const loading2 = () => import('@/components/loading/index2');
// const loading3 = () => import('@/components/loading/index3');

const loading = r => require.ensure([], () => r(require('@/components/loading/index')), 'loading');
const loading2 = r => require.ensure([], () => r(require('@/components/loading/index2')), 'loading2');
const loading3 = r => require.ensure([], () => r(require('@/components/loading/index3')), 'loading3');
const weather = r => require.ensure([], () => r(require('@/components/weather/index')), 'weather');
const pagination = r => require.ensure([], () => r(require('@/components/pagination/index')), 'pagination');
const test = r => require.ensure([], () => r(require('@/components/test/expression')), 'test');
const test2 = r => require.ensure([], () => r(require('@/components/test2/index')), 'test2');
const voice = r => require.ensure([], () => r(require('@/components/voice/index')), 'voice');
const video = r => require.ensure([], () => r(require('@/components/videoPlayer/videoPlayer')), 'video');
const video2 = r => require.ensure([], () => r(require('@/components/videoPlayer/video2.vue')), 'video2');
const dailyPlan = r => require.ensure([], () => r(require('@/views/todo/dailyPlan.vue')), 'dailyPlan');
const mandalaPlan = r => require.ensure([], () => r(require('@/views/todo/mandalaPlan.vue')), 'mandalaPlan');
const china = r => require.ensure([], () => r(require('@/components/echarts/China.vue')), 'china');
const test3 = r => require.ensure([], () => r(require('@/components/emoji/smileyPreloader.vue')), 'test3');
const test4 = r => require.ensure([], () => r(require('@/components/videoPlayer/videoTest.vue')), 'test4');
const yf = r => require.ensure([], () => r(require('@/components/NPC/yf.vue')), 'yf');
const corpus = r => require.ensure([], () => r(require('@/views/corpus/corpus.vue')), 'corpus');
const phone = r => require.ensure([], () => r(require('@/views/phone/index.vue')), 'phone');
const pixel = r => require.ensure([], () => r(require('@/views/pixel/index.vue')), 'pixel');
const pixelCanvas = r => require.ensure([], () => r(require('@/components/pixel/test1/PixelCanvas.vue')), 'pixelCanvas');
const pixelConf = r => require.ensure([], () => r(require('@/components/pixel/test1/PixelConf.vue')), 'PixelConf');

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
                path: 'index',
                name: '精选',
                component: homeIndex
            },
            {
                path: 'me',
                name: '我',
                component: myself
            }
        ]
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
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
        path: '/set',
        name: 'set',
        component: set,
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
        path: '/mandalaPlan',
        name: 'mandalaPlan',
        component: mandalaPlan,
        meta: {                 //加一个自定义obj
            requireAuth:true    //这个参数 true 代表需要登录才能进入
        }
    },
    {
        path: '/eCharts',
        name: 'eCharts',
        component: china,
        // meta: {                 //加一个自定义obj
        //     requireAuth:true    //这个参数 true 代表需要登录才能进入
        // },
        // children: [
        //     {
        //         path: '/china',
        //         name: '精选',
        //         component: china
        //     },
        // ]
    },
    {
        path: '/loading',
        name: 'loading',
        // component: loading,
        children: [
            {
                path: '1',
                name: 'loading1',
                component: loading
            },
            {
                path: '2',
                name: 'loading2',
                component: loading2
            },
            {
                path: 'appp',
                name: 'loading3',
                component: loading3
            }
        ]
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
    {
        path: '/corpus',
        name: 'corpus',
        component: corpus
    },
    {
        path: '/phone',
        name: 'phone',
        component: phone
    },
    {
        path: '/pixel',
        name: 'pixel',
        component: pixel
    },
    {
        path: '/pixelCanvas',
        name: 'pixelCanvas',
        component: pixelCanvas
    },
    {
        path: '/pixelConf',
        name: 'pixelConf',
        component: pixelConf
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
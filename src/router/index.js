import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Participate from '@/components/Participate'
import Products from '@/components/pages/Products'
import Custom from '@/components/pages/Custom'
import CustomChackout from '@/components/pages/CustomCheckout'
import FullCalendar from '@/components/pages/FullCalendar'
import Date from '@/components/pages/Date'
import Date2 from '@/components/pages/Date2'
import OpenDate from '@/components/pages/OpenDate'
import AddUser from '@/components/pages/AddUser'
import HomeBoard from '@/components/HomeBoard'
import Front from '@/components/pages/Front'
import SearchShopBoard from '@/components/SearchShopBoard'
import SearchShop from '@/components/pages/SearchShop'
import ShopBoard from '@/components/ShopBoard'
import ShopProduct from '@/components/pages/ShopProduct'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path:'*',
            redirect:'/'
        },
        {
            name: '首頁',
            path: '/home',
            component: Home,
            meta:{requiresAuth:true}
        },
        {
            name: 'login',
            path: '/',
            component: Login,
        },
        {
            name: 'openDate',
            path: '/openDate',
            component: OpenDate,
            meta:{requiresAuth:true}
        },
        {
            name: 'participate',
            path: '/participate',
            component: Participate,
            meta:{requiresAuth:true}
        },
        
        {
            name: 'Home',
            path: '/homeBoard',
            component: HomeBoard,
            children:[
                {
                    name: '購物',
                    path: 'front',
                    component: Front,
                },
                ]
        },
        
        {
            name: 'SearchShopBoard',
            path: '/searchShopBoard',
            component: SearchShopBoard,
            children:[
                {
                    name: '搜尋商店',
                    path: 'searchShop',
                    component: SearchShop,
                },
                ]
        },
        
        {
            name: 'ShopBoard',
            path: '/shopBoard',
            component: ShopBoard,
            children:[
                {
                    name: '商店',
                    path: 'shopProduct',
                    component: ShopProduct,
                },
                ]
        },

        {
            name: '產品',
            path: '/dashboard',
            component: Dashboard,
            meta:{requiresAuth:true},
            children:[
                {
                    name: '產品',
                    path: 'products',
                    component: Products,
                },
                {
                    name: 'fullCalendar',
                    path: 'fullCalendar',
                    component: FullCalendar,
                },
                {
                    name: 'date2',
                    path: 'date2',
                    component: Date2,
                },
                {
                    name: 'openDate',
                    path: 'openDate',
                    component: OpenDate,
                },
                {
                    name: 'addUser',
                    path: 'addUser',
                    component: AddUser,
                },
            ]
        },
        {
            name: '產品',
            path: '/',
            component: Dashboard,
            meta:{requiresAuth:true},
            children:[
                {
                    name: '模擬功能',
                    path: 'custom',
                    component: Custom,
                },
                {
                    name: '模擬付款',
                    path: 'customer_checkout/:orderId',
                    component: CustomChackout,
                },
            ]
        },
    ]
});
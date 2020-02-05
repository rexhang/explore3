import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login/Login'
import Index from '@/components/Index/Index'
import Header from '@/components/Header/Header'
import Element from '@/components/Element/Index'
import Setting from '@/components/Setting/Index'
import About from '@/components/About/Index'
import Upload from '@/components/Upload/Upload'
import NewProject from '@/components/NewProject/NewProject'
import Addmaterial from '@/components/Addmaterial/Addmaterial'
import Banner from '@/components/Banner/Banner'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: Login
        },
        {
            path: '*',
            name: 'matchall',
            component: Login
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index
        },
        {
            path: '/Header',
            name: 'Header',
            component: Header
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index
        },
        {
            path: '/Setting',
            name: 'Setting',
            component: Setting
        },
        {
            path: '/Element',
            name: 'Element',
            component: Element
        },
        {
            path: '/About',
            name: 'About',
            component: About
        },
        {
            path: '/Upload',
            name: 'Upload',
            component: Upload
        },
        {
            path: '/NewProject',
            name: 'NewProject',
            component: NewProject
        },
        {
            path: '/AddProject/Addmaterial',
            name: 'Addmaterial',
            component: Addmaterial
        },
        {
            path: '/Banner',
            name: 'Banner',
            component: Banner
        }
    ]
})

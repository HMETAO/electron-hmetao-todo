import {createRouter, createWebHashHistory} from "vue-router"
import type {Router, RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        name: "Home",
        path: "/home",
        component: () => import("@/views/Home.vue")
        // children: [
        //     {
        //         path: "",
        //         component: () => import("../views/home.vue")
        //     },
        //     {
        //         path: "about",
        //         component: () => import("../views/about.vue")
        //     }
        // ]
    }
]
const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})
// // 前置守卫
// router.beforeEach((to, from, next) => {
//
// })
// // 后置守卫
// router.afterEach(async (to, from, failure) => {
// })

export default router
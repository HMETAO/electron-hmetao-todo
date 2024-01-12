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
        redirect: "/todo",
        component: () => import("@/views/Home.vue"),
        children: [
            {
                name: "Todo",
                path: "/todo",
                component: () => import("@/components/todo/Todo.vue")
            }
        ]
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
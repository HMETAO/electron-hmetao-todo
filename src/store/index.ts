import {defineStore} from "pinia";
import {Names} from "./store-name";

export const useBaseStore = defineStore(Names.BASE, {

    state() {
        return {
        }
    },
    getters: {},
    actions: {}
})

// 此store是非缓存对象用来存储不需要缓存的状态变量
export const useStateStore = defineStore(Names.STATE, {
    state() {
        return {
            loading: false,
        }
    },
    getters: {},
    actions: {}
})


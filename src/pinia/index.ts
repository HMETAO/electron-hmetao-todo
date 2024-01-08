import {createPinia, PiniaPluginContext} from "pinia";
import {nextTick} from "vue";
import {ElLoading} from "element-plus";
import {LoadingInstance} from "element-plus/es/components/loading/src/loading";
import {Names} from "@/store/store-name";

// index start
const index = createPinia()
const setStorage = (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val))
}
const getStorage = (key: string) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}
let loadingInstance: LoadingInstance
const loadingChange = async (loading: boolean) => {
    if (!loading) {
        if (loadingInstance != null)
            await nextTick(() => {
                // Loading should be closed asynchronously
                loadingInstance.close()
            })
    } else {
        loadingInstance = ElLoading.service({
            lock: true,
            text: 'Loading . . .',
            background: 'rgba(223, 230, 233,.7)',
        })
    }
}

interface Options {
    key?: string
}

const base_key = "HMETAO"
const piniaPlugin = (option: Options) => {
    return (context: PiniaPluginContext) => {
        const store = context.store;
        const key = (option?.key ?? base_key) + "-" + store.$id
        store.$subscribe(() => {
            // 如果是状态store不需要缓存
            if (store.$id === Names.STATE) {
                loadingChange(store.$state.loading)
            }
        })
        return {
            ...getStorage(key)
        }
    }
}


index.use(piniaPlugin({key: "HMETAO"}))
export default index

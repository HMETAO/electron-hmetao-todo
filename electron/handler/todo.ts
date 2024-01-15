import {BrowserWindow, IpcMainInvokeEvent} from "electron";
import {TODO_STORE} from "../constants/store";
import type Store from "electron-store";


export function getTodoList(win: BrowserWindow, store: Store) {
    return (event: IpcMainInvokeEvent) => {
        const res = store.get(TODO_STORE, [{
            list: [
                {
                    id: 1,
                    title: "任务一",
                    description: "任务一描述",
                    endTime: "2021-11-11 10:00:00",
                    isComplete: false
                },
                {
                    id: 2,
                    title: "任务二",
                    description: "任务二描述",
                    endTime: "2021-11-11 10:00:00",
                }
            ], date: new Date().toLocaleDateString()
        }, {
            list: [],
            date: new Date().toLocaleDateString()
        }]) as any
        let total = 0, complete = 0;
        res.forEach(item => {
            item.list.forEach(i => {
                if (i.isComplete) {
                    complete++;
                }
                total++;
            })
        })
        return {total, complete, data:res};
    }
}

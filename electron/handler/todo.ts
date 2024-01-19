import {BrowserWindow, IpcMainInvokeEvent} from "electron";
import {TODO_STORE} from "../constants/store";
import type Store from "electron-store";
import {Temporal} from "@js-temporal/polyfill";

export type Todo = {
    date: string,
    list: TodoType[]
}
export type TodoType = {
    title?: string,
    isComplete?: boolean,
    description?: string,
    endTime?: string,
    level?: number
}

export function getTodoList(win: BrowserWindow, store: Store) {
    return (event: IpcMainInvokeEvent) => {
        const res = store.get(TODO_STORE, []) as Todo[]
        let total = 0, complete = 0;

        res.forEach(item => {
            let date = Temporal.Now.plainDateISO().toString()
            item.list.forEach(i => {
                if (i.isComplete) {
                    complete++;
                }
                total++;
                date = Temporal.PlainDate.from(i.endTime).toString()
            })
            item.date = date
        })
        res.sort((a, b) => {
            return Temporal.PlainDate.compare(b.date, a.date)
        })
        return {total, complete, data: res};
    }
}


export function insertTodo(win: BrowserWindow, store: Store) {
    return (event: IpcMainInvokeEvent, data: string) => {
        let todo = JSON.parse(data) as TodoType

        if (!todo.endTime) {
            todo.endTime = Temporal.Now.plainDateTimeISO().toString({smallestUnit: 'minute', calendarName: 'never'})
        } else {
            todo.endTime = Temporal.Instant.from(todo.endTime).toZonedDateTime({
                timeZone: "Asia/Shanghai",
                calendar: Temporal.Calendar.from("iso8601")
            }).toPlainDateTime().toString()
        }

        let res = store.get(TODO_STORE, []) as Todo[]
        let check = false
        todo.isComplete = false
        res.forEach(item => {
            if (Temporal.PlainDateTime.from(item.date).toPlainDate()
                .equals(Temporal.PlainDateTime.from(todo.endTime).toPlainDate())) {
                item.list.push(todo)
                check = true;
            }
        })

        if (!check) {
            res.push({
                list: [todo],
                date: Temporal.PlainDateTime.from(todo.endTime).toPlainDate().toString()
            })
        }
        store.set(TODO_STORE, res);
    }
}

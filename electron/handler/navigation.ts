import {BrowserWindow,IpcMainInvokeEvent} from "electron";

export function navigationClose(win: BrowserWindow) {
    return (event: IpcMainInvokeEvent) => {
        win.hide();
        win.setSkipTaskbar(true);
        event.preventDefault();
    }
}
export function navigationMinimize(win: BrowserWindow) {
    return (event: IpcMainInvokeEvent) => {
        win.minimize()
    }
}

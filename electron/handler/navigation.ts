import {BrowserWindow,IpcMainInvokeEvent} from "electron";

export function NavigationClose(win: BrowserWindow) {
    return (event: IpcMainInvokeEvent) => {
        win.hide();
        win.setSkipTaskbar(true);
        event.preventDefault();
    }
}
export function NavigationMinimize(win: BrowserWindow) {
    return (event: IpcMainInvokeEvent) => {
        win.minimize()
    }
}

import {BrowserWindow, ipcMain, IpcMainInvokeEvent} from "electron";
import {NAVIGATION_CLOSE} from "../constants/channelConstant";

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

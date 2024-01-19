import {app, BrowserWindow, shell, ipcMain, Menu, Tray} from 'electron'
import {buildSystemTrayMenu} from '../components/menus'
import {release} from 'node:os'
import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {GET_TODO, INSERT_TODO, NAVIGATION_CLOSE, NAVIGATION_MINIMIZE} from "../constants/channel";
import {NavigationClose, NavigationMinimize} from "../handler/navigation";
import {getTodoList, insertTodo} from "../handler/todo";

import Store from "electron-store";

let option = {
    name: "config",//文件名称,默认 config
    fileExtension: "json",//文件后缀,默认json
    cwd: app.getPath('userData'),//文件位置,尽量不要动，默认情况下，它将通过遵循系统约定来选择最佳位置。C:\Users\xxx\AppData\Roaming\my-electron\config.json
    clearInvalidConfig: true, // 发生 SyntaxError  则清空配置,
}
const store = new Store(option);
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
const icon = join(process.env.VITE_PUBLIC, 'favicon.png');
let tray = null

// 创建完win窗口后处理
const createWindowPostProcess = (win: BrowserWindow) => {
    // 设置系统托盘
    tray = new Tray(icon)
    tray.setContextMenu(buildSystemTrayMenu(win))
    // 点击导航栏关闭
    ipcMain.handle(NAVIGATION_CLOSE, NavigationClose(win))
    // 点击最小化
    ipcMain.handle(NAVIGATION_MINIMIZE, NavigationMinimize(win))
    // 获取todo列表
    ipcMain.handle(GET_TODO, getTodoList(win, store))
    // 新增todo
    ipcMain.handle(INSERT_TODO, insertTodo(win, store))
}

async function createWindow() {

    win = new BrowserWindow({
        title: 'Main window',
        width: 1200,
        height: 700,
        center: true,
        frame: false,
        icon: icon,
        webPreferences: {
            preload
        },
    })


    if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
        win.webContents.openDevTools()
        win.loadURL(url)
    } else {
        win.loadFile(indexHtml)
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })
    createWindowPostProcess(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})


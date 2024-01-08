import {BrowserWindow, Menu} from 'electron'

export const buildSystemTrayMenu = (win: BrowserWindow) => {
    return Menu.buildFromTemplate([
        {
            label: '调试',
            click: () => {
                // 打开开发者工具
                win.webContents.openDevTools()
            }
        },
        {
            label: '显示主界面',
            click: () => {
                //显示主窗口
                win.show();
            }
        },
        {
            label: '退出',
            click: () => {
                // app.quit();
                win.destroy();//我们需要在这里有一个真正的退出（这里直接强制退出）
            }
        }
    ])
}

'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
let win = null
const isDevelopment = process.env.NODE_ENV !== 'production'
const ex = process.execPath;
app.setLoginItemSettings({
  openAtLogin: true,
  path: ex,
  args: []
});


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true, stream: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1600,
    height: 1000,
    frame: false,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {//dev
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL(`file://${__dirname}/index.html`)//build
  }
  win.setMenu(null);
  //自定义方法
  ipcMain.on('min', e => win.minimize());
  ipcMain.on('max', e => {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  });
  ipcMain.on('close', e => win.close());
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

//1
app.on('ready', async () => {
  createWindow()
})

//2
// const gotTheLock = app.requestSingleInstanceLock()
// if (!gotTheLock) {

//   app.quit()

// } else {
//   app.on('second-instance', (event, commandLine, workingDirectory) => {
//     if (win) {
//       // if (win.isMinimized()) win.restore()
//       // win.focus()
//       // win.flashFrame(true)
//       dialog.showMessageBox({
//         type: 'info',
//         title: '提示',
//         message: '确认新开软件窗口？',
//         buttons: ['关闭所有窗口并新建', '仅新建窗口'],   //选择按钮，点击确认则下面的idx为0，取消为1
//         cancelId: 2, //button索引
//       }).then(idx => {
//         //注意上面↑是用的then，网上好多是直接把方法做为showMessageBox的第二个参数，我的测试下不成功
//         if (idx.response == 1) {
//           createWindow()
//         } else if (idx.response == 0) {
//           app.relaunch();
//           app.quit()
//         } else {

//         }
//       })
//     }

//   })
//   app.on('ready', async () => {
//     //不需要,等的烦
//     createWindow()
//   })
// }


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


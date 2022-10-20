import { ipcMain, app, BrowserWindow } from 'electron';
import { OpusBrowserApplication } from './model/OpusBrowserApplication';


const hasInstanceLock = app.requestSingleInstanceLock();
ipcMain.setMaxListeners(0);

let opusBrowserApplication: OpusBrowserApplication | null = null;

if (!hasInstanceLock) {
    app.quit();
} else {
    app.on("second-instance", () => {
        if (opusBrowserApplication) {
            const mainWindow = opusBrowserApplication.getMainWindow();
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    })
}


app.whenReady().then(() => {
    opusBrowserApplication = new OpusBrowserApplication();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            // opusBrowserApplication === null
            opusBrowserApplication = new OpusBrowserApplication();
        }
    })
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})


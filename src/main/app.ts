import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

class TimerApp {
    mainWindow: Electron.BrowserWindow | null;

    constructor() {
        app.whenReady().then(() => this.createWindow());
        this.subsribeForAppEvents();
    }

    createWindow = () => {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({
            height: 600,
            width: 800,
            webPreferences: {
                webSecurity: false,
                devTools: process.env.NODE_ENV === "production" ? false : true,
            },
        });

        // and load the index.html of the app.
        this.mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, "./index.html"),
                protocol: "file:",
                slashes: true,
            })
        );
        // this.mainWindow.loadURL("https://yandex.ru/");

        // Emitted when the window is closed.
        this.mainWindow.on("closed", () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null;
        });
    };

    subsribeForAppEvents = () => {
        app.on("window-all-closed", () => {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== "darwin") {
                app.quit();
            }
        });

        app.on("activate", () => {
            // On OS X it"s common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.mainWindow === null) {
                this.createWindow();
            }
        });
    };
}

export default TimerApp;

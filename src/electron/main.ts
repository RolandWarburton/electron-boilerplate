import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
	});

	mainWindow.loadFile("dist/index.html");

	// Open the DevTools.
	if (isDev) {
		console.log("Running in development");
		mainWindow.webContents.openDevTools({ mode: "right" });
	} else {
		console.log("Running in production");
	}
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("window-all-closed", function () {
	app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

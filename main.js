const {app, Menu, MenuItem, globalShortcut, BrowserView } = require('electron');
const {BrowserWindow} = require('electron');
const menu = new Menu()
let win;
let contents;
function createWindow(){
	win = new BrowserWindow({width: 800, height: 1000,webPreferences:{nodeIntegration: false}});
	contents = win.webContents;

	// win.loadURL('https://youtube.com');
	// win.loadURL('https://gaana.com');
	// win.webContents.openDevTools();
	win.on("closed", ()=>{
		win = null;
	});

	globalShortcut.register('F8', () => {
		contents.executeJavaScript("document.querySelector('.ytp-play-button').click()", true);
		contents.executeJavaScript("document.querySelector('.play-song').click()", true);
	})
	globalShortcut.register('F9', () => {
		contents.executeJavaScript("document.querySelector('.ytp-next-button').click()", true);
		contents.executeJavaScript("document.querySelector('.next-song').click()", true);
	})
	globalShortcut.register('F7', () => {
		contents.executeJavaScript("document.querySelector('.ytp-prev-button').click()", true);
		contents.executeJavaScript("document.querySelector('.prev-song').click()", true);
	})
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{

	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', ()=>{
	if (win === null) {
		createWindow()
	}
});

const {app, Menu, MenuItem, globalShortcut } = require('electron');
const {BrowserWindow} = require('electron');
const menu = new Menu()
let win;
let contents;
function createWindow(){
	win = new BrowserWindow({width: 800, height: 1000});
	contents = win.webContents;

	win.loadFile('index.html');
	win.webContents.openDevTools();
	win.on("closed", ()=>{
		win = null;
	});
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

app.on('ready', () => {
  globalShortcut.register('F8', () => {
    console.log("kuppuraj");
	contents.executeJavaScript("document.querySelector('.ytp-play-button').click()", true)
	  .then((result) => {
	    console.log(result) // Will be the JSON object from the fetch call
	  })
  })
})

app.on('ready', () => {
  globalShortcut.register('F9', () => {
    console.log("kuppuraj");
	contents.executeJavaScript("document.querySelector('.ytp-next-button').click()", true)
	  .then((result) => {
	    console.log(result) // Will be the JSON object from the fetch call
	  })
  })
})

app.on('ready', () => {
  globalShortcut.register('F7', () => {
    console.log("kuppuraj");
	contents.executeJavaScript("document.querySelector('.ytp-prev-button').click()", true)
	  .then((result) => {
	    console.log(result) // Will be the JSON object from the fetch call
	  })
  })
})

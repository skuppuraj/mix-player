const {app, Menu, MenuItem, globalShortcut, BrowserView, autoUpdater } = require('electron');
const {BrowserWindow} = require('electron');
const menu = new Menu()
let win;
let contents;
const template = [
  {
  	label: "Main",
  	submenu:[
  		{
  			label: "YouTube.com",
  			click() {  win.loadURL('https://youtube.com') }

  		},
  		{
  			label: "Gaana.com",
  			click() {  win.loadURL('https://gaana.com') }
  		}
  	]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Edit menu
  template[2].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )

  // Window menu
  template[4].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

function createWindow(){
	win = new BrowserWindow({width: 1300, height: 800,webPreferences:{nodeIntegration: false}, show: false,
	                        	title:"Mix Player",
							});
	contents = win.webContents;

	win.loadURL('https://youtube.com');
	win.on("closed", ()=>{
		win = null;
	});

	win.once('ready-to-show', () => {
	  win.show()
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

	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
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

require('update-electron-app')()
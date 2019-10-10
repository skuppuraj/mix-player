const setupEvents = require('./installers/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }
const {app, Menu, MenuItem, globalShortcut, BrowserView, autoUpdater } = require('electron');
const {BrowserWindow} = require('electron');
const menu = new Menu();
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
	  },
    {
       label: "Saavn.com",
       click() {  win.loadURL('https://jiosaavn.com') }
    },
	  { type: 'separator' },
	  { 
	  	 label:"New App request",
	  	 click() {
	  	 	require('electron').shell.openExternal('https://github.com/skuppuraj/mix-player/issues/new')
	  	 }
	  },
	  {
	  	 label: "Facing issues",
	  	 click() {require('electron').shell.openExternal('https://github.com/skuppuraj/mix-player/issues')}
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
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
   {
    label: 'History',
    submenu: [
      { label: 'Back',
        click(){
          win.webContents.goBack()
        },
        accelerator: 'CmdOrCtrl+['
      },
      { label: 'Forward',
        click(){
          win.webContents.goForward()
        },
        accelerator: 'CmdOrCtrl+]'
      }
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
  template[5].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

function createWindow(){
	win = new BrowserWindow({width: 1300, height: 800,webPreferences:{
                                                      nodeIntegration: false, 
                                                      nativeWindowOpen: true,
                                                      safeDialogs: true,
                                                      devTools:true
                                                    }, 
                            show: true,
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

	win.on('swipe', function(e, direction){
		if (direction == 'right') {
			win.webContents.goBack();
		}else if (direction == 'left') {
			win.webContents.goForward();
		}
	});

	globalShortcut.register('MediaPlayPause', () => {
    var doc = "if(document.querySelector('#play').classList.contains('hide')){document.querySelector('#pause').click()}else{document.querySelector('#play').click()}";
		contents.executeJavaScript("document.querySelector('.ytp-play-button').click()", true);
    contents.executeJavaScript("document.querySelector('.play-song').click()", true);
    contents.executeJavaScript("document.querySelector('.yt-button-renderer').click()", true);
		contents.executeJavaScript(doc, true);
	})
	globalShortcut.register('MediaNextTrack', () => {
		contents.executeJavaScript("document.querySelector('.ytp-next-button').click()", true);
    contents.executeJavaScript("document.querySelector('.next-song').click()", true);
		contents.executeJavaScript("document.querySelector('#fwd').click()", true);
	})
	globalShortcut.register('MediaPreviousTrack', () => {
		contents.executeJavaScript("document.querySelector('.ytp-prev-button').click()", true);
		contents.executeJavaScript("document.querySelector('.prev-song').click()", true);
    contents.executeJavaScript("document.querySelector('#rew').click()", true);
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
// require('update-electron-app')()
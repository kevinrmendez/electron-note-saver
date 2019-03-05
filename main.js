const fs = require('fs')

var ipc = require('electron').ipcMain
const {app, BrowserWindow} = require('electron')

let win;

ipc.on('createFile', (event,data)=> {
    
fs.appendFile(data.fileName + ".txt", data.text + "\n",()=>{
    event.sender.send('message-save','message saved');
})

});
ipc.on('checkFileName', (event,file)=> {

    fs.exists(file,(exist)=>{
        if(exist){
            event.sender.send('file-check', file);
        }
    })

});
function createWindow () {
    win = new BrowserWindow({width:800,height: 600});
    win.loadFile('index.html')
    win.webContents.openDevTools()
  
    win.on('closed', ()=> {
        win = null
    })
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})




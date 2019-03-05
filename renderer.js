var textarea= document.getElementById('text');
var fileName = document.getElementById('fileName');
var ipc = require('electron').ipcRenderer;

function createtext () {
  let data = {};

  data.fileName = fileName.value.toLowerCase();
  data.text = textarea.value;
  checkFileName(data.fileName);

  if(data.fileName && data.text){
    ipc.send('createFile',data);
    textarea.value = '';
    fileName.value = '';
  }else {
      alert('you are sending an empty form. Try again!')
  }
 
}

ipc.on('message-save', ()=> {
  alert('message saved');
})

ipc.on('file-check', (event,file)=> {
alert('Fil with name' + file + " already exists, the data will be saved in the same file");
});

function checkFileName(file) {
    ipc.send('checkFileName',file);
}
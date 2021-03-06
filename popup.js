/*
* @Author            : Abdullah Ali, Tejas Bhalerao
* @Date              : 2017-05-29 00:42:30
* @Description       : Handels saving the options (user id) to the chrome storage
* @Last Modified by  : Tejas
* @Last Modified time: 2017-05-29 01:11:13
* @Contact           : @xyleques, xyleques@me.com; tejasbhalerao01@gmail.com
* @version           : 2
*/

// Saves options to chrome storage
function save_options() {
  var user = document.getElementById('user').value;	
  
  //************** Set Store **************//
  chrome.storage.sync.set({'user': user}, function() {
    flashMSG("ID saved.", 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
//************** Get Store **************//
function restoreOptions() {
	console.log("Options restored");
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(null, function(items) {
  	if (items.user == "undefined" || items.user == null) {
  		document.getElementById('user').value = "Enter ID";
  		document.getElementById('save').innerHTML = "Save";
  	} else {
     document.getElementById('user').value = items.user;
     document.getElementById('save').innerHTML = "Change";
   }
 });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', save_options);

document.getElementById('download').addEventListener('click', download);
document.getElementById('clear').addEventListener('click', clear);


//////////////////Deprecated\\\\\\\\\\\\\\\\\
// Used to download a single session to local device as a JSON
// function download(){
//   chrome.storage.sync.get(null, function(items) { // null implies all items
//     // Convert object to a string.
//     var result = JSON.stringify(items);

//     var saveData = (function () {
//       var a = document.createElement("a");
//       document.body.appendChild(a);
//       a.style = "display: none";
//       return function (data, fileName) {
//         var json = JSON.stringify(data),
//         blob = new Blob([json], {type: "octet/stream"}),
//         url = window.URL.createObjectURL(blob);
//         a.href = url;
//         a.download = fileName;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       };
//     }());

//     fileName = "Pinata.json";

//     saveData(result, fileName);

//   });   

//   flashMSG("Exporting log...", 2000);
// }
//////////////////Deprecated\\\\\\\\\\\\\\\\\


///////////////// Utils //////////////
function clear(){
  chrome.storage.sync.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
  flashMSG("Session Cleared.", 1000);
}


function flashMSG(msg, time){
  document.getElementById('dis').innerHTML = msg;
  setTimeout(function(){ 
    document.getElementById('dis').innerHTML = " ";
  }, time);
}
///////////////// Utils //////////////
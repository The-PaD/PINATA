// popup.js: Handels saving the options to local storage
// Author: Abdullah Ali
// Contact: @xyleques, xyleques@me.com

// Saves options to chrome.storage.sync.
function save_options() {

  var user = document.getElementById('user').value;	
  
  //************** Set Store **************//
  chrome.storage.sync.set({'user': user}, function() {
    var status = document.getElementById('dis');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
//************** Get Store **************//
function restore_options() {
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
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
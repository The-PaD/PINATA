/*
* @Author            : Abdullah Ali, Tejas Bhalerao
* @Date              : 2017-05-29 00:42:30
* @Description       : This script is used to display the pointing statistics
* @Last Modified by  : Tejas
* @Last Modified time: 2017-05-29 01:15:08
* @Contact           : @xyleques, xyleques@me.com; tejasbhalerao01@gmail.com
* @version           : 2
*/

chrome.storage.sync.get(null, function(items) { // null implies all items
	console.log("items.t_num_clicks " + items);
	if (items.t_num_clicks === "undefined" || items.t_num_clicks == null) {
		document.getElementById('clicks').innerHTML = "";  
	} else {
		document.getElementById('clicks').innerHTML = items.t_num_clicks;
	}

	if (items.t_num_slips === "undefined" || items.t_num_slips == null) {
		document.getElementById('slips').innerHTML = "";  
	} else{
		document.getElementById('slips').innerHTML = items.t_num_slips;
	}
});
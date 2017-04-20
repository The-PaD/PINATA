// stat.js: This page is used to show the pointing stats
// Author: Abdullah Ali
// Contact: @xyleques, xyleques@me.com

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




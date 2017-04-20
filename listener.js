// Listener.js: This page is the content script (in the traditional Chrome extension architecture)
// Author: Abdullah Ali
// Contact: @xyleques, xyleques@me.com
// version: 15

// for testing purposes 
console.log("Test PINATA is starting...");

////////////// Variables \\\\\\\\\\\\\\\
	// Where Am I? The url variable 
	var wai = window.location.href;
	console.log("WAI: " + wai);

	var user = "xyleques";
	// chrome.storage.sync.set({	
	// 	'user': user
	// 	}, function(){});

	// Cursor movement
	var url = [];
	var types = [];
	var tStamp = [];
	var se_tIDs = [];
	var se_X = [];
	var se_Y = [];
	var se_targets = [];
	var se_tH = [];
	var se_tW = [];
	var se_tTags = [];
	var se_tL = [];
	var se_tT = [];
	var se_tA = [];
	var se_tCx = [];
	var se_tCy = [];
	var se_tP = [];
	var se_trP = [];
	var pause = [];
	var click_durations = [];
	var slips = [];
	var win_h = [];
	var win_w = [];
	var num_clicks = 0;

	

	// Click duration
		// The start time for a click
		var start_mil = new Date(); 
		// The end time for a click
		var end_mil = new Date(); 
		// The click duration in milliseconds
		var CLICK_DURATION;
	// Click duration

	// Slip Distance
		// starting X position for the slip distance
		var start_slip_x;
		// starting y position for the slip distance
		var start_slip_y;
		// ending X position for the slip distance
		var end_slip_x;
		// ending y position for the slip distance
		var end_slip_y;
		// The distance of the slip
		var SLIP_DISTANCE;
	// Slip Distance
////////////// Variables \\\\\\\\\\\\\\\


////////////////////////////////////////// Pointer Behavior \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	////////////// Mouse behavior handeling functions \\\\\\\\\\\\\\\

		// FUNCTION: Save the X, Y coordinates where the mouse was moved in 2 variables
			// Get information about whatever element the cursor is hovering on 
			document.onmousemove = function(e) {	
				var move_x = e.pageX;
				se_X.push(move_x);
				var move_y = e.pageY;
				se_Y.push(move_y);

			    types.push("hovering");
			    // Getting information about the target the cursor is hovering above
			    var hTarget = e.target;
			    se_targets.push(hTarget);
				// Ignoring undefined targets
				if (hTarget == "undefined") {
				} else{	
				}
				
				var hTid = hTarget.id;
				se_tIDs.push(hTid);

				// Get the target properties
				var hTarget_properties = window.getComputedStyle(hTarget, null);

				// Get height
				var hTarget_height = hTarget_properties.height; 
				se_tH.push(hTarget_height);
				hTarget_height = clearPx(hTarget_height);
				// Get width
				var hTarget_width = hTarget_properties.width; 
				se_tW.push(hTarget_width);
				hTarget_width = clearPx(hTarget_width);

				// Get element type by HTML tag
				var hTarget_tagName = hTarget.tagName;
				se_tTags.push(hTarget_tagName);

				// Get the element's position from the left of the screen
				var hLeft = getOffsetLeft(hTarget);
				se_tL.push(hLeft);

				// Get the element's position from the top of the screen
				var hTop = getOffsetTop(hTarget);
				se_tT.push(hTop);

				// Calculate the area of the element
				var hArea = getElemArea(hTarget_height, hTarget_width);
				se_tA.push(hArea);

				// Get the coordiantes of center point of the element
				var hCenter = getCenter(hLeft, hTop, hTarget_height, hTarget_width);
					//hCenter.x;
					//hCenter.y	
					se_tCx.push(hCenter.x);
					se_tCy.push(hCenter.y);

				// Pointing percision. The shortest line distance between the pointer and the center of the element 
				var p = getSlip (hCenter.x, hCenter.y, move_x, move_y);
				se_tP.push(p);
				var rP = getRelativeP(p, hArea);
				se_trP.push(rP);

				var d = new Date(); 
				var tStmp = d.getTime();
				tStamp.push(tStmp);
				pause.push(tStmp - tStamp[tStamp.length -2]);
				// console.log(tStamp[tStamp.length -1] - tStamp[tStamp.length -2]);
				var cURL = window.location.href;
				url.push(cURL);

				var cWin_h = screen.height;
				win_h.push(cWin_h);
				var cWin_w = screen.width;
				win_w.push(cWin_w);
				
				// click_durations.push("");
				// slips.push("");
			};

		// FUNCTION: Save the X, Y coordinates where the mouse was clicked in 2 variables
		document.onclick = function(e) {
		};

		// FUNCTION: Onmousedown:
		/*	Save the start time of a click
		Save the initial mouse position of a click
		*/
		document.onmousedown = function(e)
		{
			// The time the click started
			start_mil = new Date();
			// X, Y position of the mouse when the click started
			start_slip_x = e.pageX;
			start_slip_y = e.pageY;


			var move_x = e.pageX;
			se_X.push(move_x);
			var move_y = e.pageY;
			se_Y.push(move_y);
		    // coor += "X:" + e.pageX + " Y:" + e.pageY +"-";

		    types.push("mouse down");
		    // Getting information about the target the cursor is hovering above
		    var hTarget = e.target;
		    se_targets.push(hTarget);

			// Ignoring undefined targets
			if (hTarget == "undefined") {
			} else{	
			}
			
			var hTid = hTarget.id;
			se_tIDs.push(hTid);

			// Get the target properties
			var hTarget_properties = window.getComputedStyle(hTarget, null);

			// Get height
			var hTarget_height = hTarget_properties.height; 
			se_tH.push(hTarget_height);
			hTarget_height = clearPx(hTarget_height);
			// Get width
			var hTarget_width = hTarget_properties.width; 
			se_tW.push(hTarget_width);
			hTarget_width = clearPx(hTarget_width);

			// Get element type by HTML tag
			var hTarget_tagName = hTarget.tagName;
			se_tTags.push(hTarget_tagName);

			// Get the element's position from the left of the screen
			var hLeft = getOffsetLeft(hTarget);
			se_tL.push(hLeft);

			// Get the element's position from the top of the screen
			var hTop = getOffsetTop(hTarget);
			se_tT.push(hTop);

			// Calculate the area of the element
			var hArea = getElemArea(hTarget_height, hTarget_width);
			se_tA.push(hArea);

			// Get the coordiantes of center point of the element
			var hCenter = getCenter(hLeft, hTop, hTarget_height, hTarget_width);
			//hCenter.x;
			//hCenter.y	
			se_tCx.push(hCenter.x);
			se_tCy.push(hCenter.y);

			// Pointing percision. The shortest line distance between the pointer and the center of the element 
			var p = getSlip (hCenter.x, hCenter.y, move_x, move_y);
			se_tP.push(p);
			var rP = getRelativeP(p, hArea);
			se_trP.push(rP);

			var d = new Date(); 
			var tStmp = d.getTime();
			tStamp.push(tStmp);
			pause.push(tStmp - tStamp[tStamp.length -2]);
			// console.log(tStamp[tStamp.length -1] - tStamp[tStamp.length -2]);
			var cURL = window.location.href;
			url.push(cURL);

			var cWin_h = screen.height;
			win_h.push(cWin_h);
			var cWin_w = screen.width;
			win_w.push(cWin_w);
			
			// click_durations.push("");
			// slips.push("");
		};

		// Function: Onmouseup:
		/*	Save the end time of a click
		Calculate the click duration
		Save the end position of the mouse
		Calculate the slip distance
		*/
		document.onmouseup = function(e)
		{
		 	// The time the click ended
		 	end_mil  = new Date();
		 	
			// Get the duration of the click
			CLICK_DURATION =  end_mil - start_mil;
			click_durations.push(CLICK_DURATION);
			
			// X, Y position of the mouse when the click started
			end_slip_x = e.pageX;
			end_slip_y = e.pageY;

			// This is the slip distance
			var slip = getSlip(start_slip_x, start_slip_y, end_slip_x, end_slip_y);
			slips.push(slip);

			var move_x = e.pageX;
			se_X.push(move_x);
			var move_y = e.pageY;
			se_Y.push(move_y);
		    // coor += "X:" + e.pageX + " Y:" + e.pageY +"-";

		    types.push("mouse up");
		    // Getting information about the target the cursor is hovering above
		    var hTarget = e.target;
		    se_targets.push(hTarget);
			// Ignoring undefined targets
			if (hTarget == "undefined") {
			} else{	
			}
			
			var hTid = hTarget.id;
			se_tIDs.push(hTid);

			// Get the target properties
			var hTarget_properties = window.getComputedStyle(hTarget, null);

			// Get height
			var hTarget_height = hTarget_properties.height; 
			se_tH.push(hTarget_height);
			hTarget_height = clearPx(hTarget_height);
			// Get width
			var hTarget_width = hTarget_properties.width; 
			se_tW.push(hTarget_width);
			hTarget_width = clearPx(hTarget_width);

			// Get element type by HTML tag
			var hTarget_tagName = hTarget.tagName;
			se_tTags.push(hTarget_tagName);

			// Get the element's position from the left of the screen
			var hLeft = getOffsetLeft(hTarget);
			se_tL.push(hLeft);

			// Get the element's position from the top of the screen
			var hTop = getOffsetTop(hTarget);
			se_tT.push(hTop);

			// Calculate the area of the element
			var hArea = getElemArea(hTarget_height, hTarget_width);
			se_tA.push(hArea);

			// Get the coordiantes of center point of the element
			var hCenter = getCenter(hLeft, hTop, hTarget_height, hTarget_width);
			//hCenter.x;
			//hCenter.y	
			se_tCx.push(hCenter.x);
			se_tCy.push(hCenter.y);

			// Pointing percision. The shortest line distance between the pointer and the center of the element 
			var p = getSlip (hCenter.x, hCenter.y, move_x, move_y);
			se_tP.push(p);
			var rP = getRelativeP(p, hArea);
			se_trP.push(rP);

			var d = new Date(); 
			var tStmp = d.getTime();
			tStamp.push(tStmp);
			pause.push(tStmp - tStamp[tStamp.length -2]);
			// console.log(tStamp[tStamp.length -1] - tStamp[tStamp.length -2]);
			var cURL = window.location.href;
			url.push(cURL);

			var cWin_h = screen.height;
			win_h.push(cWin_h);
			var cWin_w = screen.width;
			win_w.push(cWin_w);

			num_clicks++;


			//************** Get Store **************//
			chrome.storage.sync.set({			
				// 'Type': types, 
				// 'timeStamp': tStamp, 
				// 'pause': pause, 
				// 'tID': se_tIDs, 
				'url': url, 
				// 'x': se_X, 
				// 'y': se_Y,
				// 'targets': se_targets, 
				// 'heights': se_tH, 
				// 'widths': se_tW ,
				// 'tags': se_tTags,
				// 'left': se_tL,
				// 'top': se_tT,
				// 'area': se_tA,
				// 'Center_X': se_tCx,
				// 'Center_Y': se_tCy,
				'click_durations': click_durations,
				'slips': slips,
				'num_clicks': num_clicks
				// 'win_height': win_h,
				// 'win_width': win_w
			}, function(){});

			url = [];
			types = [];
			tStamp = [];
			se_tIDs = [];
			se_X = [];
			se_Y = [];
			se_targets = [];
			se_tH = [];
			se_tW = [];
			se_tTags = [];
			se_tL = [];
			se_tT = [];
			se_tA = [];
			se_tCx = [];
			se_tCy = [];
			se_tP = [];
			se_trP = [];
			pause = [];
			click_durations = [];
			slips = [];
			win_h = [];
			win_w = [];
			num_clicks = 0;


			// Send message to background page to send info to server 
			chrome.extension.sendMessage({send: "send"}, 
				function(response) { 
					console.log(response);
				});

			notification();
		}; //End of onmouseup

		//common function to populate the variables
		function populateVars() {

		}

	////////////// Mouse behavior handeling functions \\\\\\\\\\\\\\\


	/////////// Assist functions \\\\\\\\\\
		/////////// Math functions \\\\\\\\\\
		function getSlip (sx, sy, ex, ey)
		{

			SLIP_DISTANCE = Math.sqrt( Math.pow(Math.abs(sx - ex), 2) + Math.pow(Math.abs(sy - ey), 2) );
			return SLIP_DISTANCE;

		}	

		function axisDistance (sx, sy, ex, ey)
		{

			axisDistance = Math.sqrt( Math.pow(Math.abs(sx - ex), 2) + Math.pow(Math.abs(sy - ey), 2) );
			return axisDistance;

		}	
		/////////// Math functions \\\\\\\\\\

		// Get the distance between the left edge of the window and the left of the element
		function getOffsetLeft( elem ){
			var offsetLeft = 0;
			do {
				if ( !isNaN( elem.offsetLeft ) )
				{
					offsetLeft += elem.offsetLeft;
				}
			} while( elem = elem.offsetParent );
			return offsetLeft;
		}

		// Get the distance between the top edge of the window and the top of the element
		function getOffsetTop( elem ){
			var offsetTop = 0;
			do {
				if ( !isNaN( elem.offsetTop ) )
				{
					offsetTop += elem.offsetTop;
				}
			} while( elem = elem.offsetParent );
			return offsetTop;
		}

		// Calculate the area of the target
		function getElemArea(h, w){
			a = h*w;
			a = a.toFixed(2);
			return a;
		}

		// Get the center point of the target 
		function getCenter(offLeft, offTop, h, w){
			
			xPos = offLeft + (w / 2);
			yPos =  offTop + (h / 2);
			return {
				x: xPos,
				y: yPos
			};   
		}

		function getRelativeP(p, r){
			var rp =p / r; 
			rp = rp.toFixed(2);
			return rp;
		}

		function clearPx(item){
			var lastTwoW = item.substr(item.length - 2);
			if (lastTwoW == "px"){
				item = item.substring(0, item.length - 2);
				item = parseInt(item);	
			}
			return item;
		}
	/////////// Assist functions \\\\\\\\\\

////////////////////////////////////////// Pointer Behavior \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




////////////////////////////////////////// Notifications And Adaptations \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	////////////// Options \\\\\\\\\\\\\\\
		// 	Bar (on/off)

		// Bar color red (on/off)
		// var barRed; 
		// // Bar color blue (on/off)
		// var barBlue;
		// // Bar color green (on/off)
		// var barGreen;

		// bar position
		var posTop;
		var posBtm;

		// 	Bar+ (on/off)
		// var barPlus;
		
		// 	Dialog box (on/off)
		// var dialogBox;
		
		// 	Zoom adaptation (on/off)
		var zoomAdapt;
	////////////// Options \\\\\\\\\\\\\\\

	///////////// Talking to options.js for notification preferences \\\\\\\\\\\\\\\
	
		// Get options set by the options page from local storage
		
		//************** Get Store **************//
		chrome.storage.sync.get({	
			// bar: false,
			// barPlus: false,
			// dialogBox: false,
			zoomAdapt: false
			// barRed: true,
			// barBlue: false,
			// barGreen: false

		}, function(items) {
	  		// Set the options to local variables to this 
	  		// bar 				= items.bar;
	  		// barPlus 			= items.barPlus;
	  		// dialogBox 			= items.dialogBox;
	  		zoomAdapt 			= items.zoomAdapt;
	  		// barRed 				= items.barRed;
	  		// barBlue 			= items.barBlue;
	  		// barGreen 			= items.barGreen;
	  	});

		if (zoomAdapt === true){
			adaptToZoome();
		}

	///////////// Talking to options.js for notification preferences \\\\\\\\\\\\\\\


	///////////// Feedback HTML elements \\\\\\\\\\\\\\\
		//This is javascript code that creates HTML elements to be injected on web pages

		///////////// Bar \\\\\\\\\\\\\\\
			// This is the HTML element for the Bar notification
			// Create a DIV element
			var barElement=document.createElement("DIV");

			barElement.style.display = "none";
			// Fixed position
			barElement.style.position = "fixed";
			// Top of the page
			
			// bar position
			// barElement.style.top = "0px";

			// As wide as the page
			barElement.style.width = "100%";
			// 3px in height
			// barElement.style.height= "5px";
			// z-index set to 999 so the DIV would appear on top of other elements of the page
			barElement.style.zIndex = "2147483647";
			
			// Set the background 
			// barElement.style.background = "#fc2862";
			// Add blank text to the DIV so it would show
			var tmp = document.createTextNode("");
			barElement.appendChild(tmp);
			// Add the DIV element to the body of the page
			document.body.appendChild(barElement);

			//ct Bar
			var ctBarElement = barElement;
			document.body.appendChild(ctBarElement);			
		///////////// Bar \\\\\\\\\\\\\\\

		///////////// Bar+ \\\\\\\\\\\\\\\
			// This is the HTML element for the Bar+ notification 
			// Create a DIV element
			var barPlusElement=document.createElement("DIV");
			
			// Hide the Bar+ by default, it will show when triggered 
			barPlusElement.style.display = "none";
			
			// Fixed position
			barPlusElement.style.position = "fixed";
			// Top of the page
			barPlusElement.style.top = "0px";
			// As wide as the page
			barPlusElement.style.width = "100%";
			// 3px in height
			barPlusElement.style.height= "45px";
			// z-index set to 999 so the DIV would appear on top of other elements of the page
			barPlusElement.style.zIndex = "2147483647";
			// Set the background 
			barPlusElement.style.background = "#efefef";
			// Set text color
			barPlusElement.style.color = "#656565";
			// Set text size
			barPlusElement.style.fontSize = "10pt";
			// Set text type
			barPlusElement.style.fontFamily = "Helvetica" ;
			// Set bottom border
			barPlusElement.style.borderBottom = "1px solid #ccc";
			// Set padding
			barPlusElement.style.padding = "5px";
			// Add shadow to give layering illusion, this element is on top of the page
			barPlusElement.style.boxShadow = "2px 1px 1px #000";
			

			// Add logo to Bar+ notification
			var logoBP = document.createElement("IMG");
			logoBP.src = chrome.extension.getURL("img/newConceptCircleYellow.png");
			logoBP.style.display = "block";
			logoBP.style.width = "35px";
			logoBP.style.height = "35px";
			logoBP.style.float = "left";
			logoBP.style.marginLeft = "10px";
			logoBP.style.marginTop = "7px";

			barPlusElement.appendChild(logoBP);


			// Add the notification text to the Bar+ element 
			var notifBPTxt=document.createElement("DIV");
			notifBPTxt.style.display = "block";
			notifBPTxt.style.float = "left";
			// notifBPTxt.style.clear = "both";
			notifBPTxt.style.width = "50%";
			notifBPTxt.style.height = "45px";
			notifBPTxt.style.paddingTop = "5px";
			notifBPTxt.style.marginLeft = "10px";
			notifBPTxt.style.lineHeight = "15px";
			notifBPTxt.style.color = "#000";

			notifBPTxt.innerHTML = "The webpage you are currently browsing seems to have small, hard to click targets!<br> Would you like the page to be zoomed in for a more enjoyable browsing experience?";
			barPlusElement.appendChild(notifBPTxt);

			// Buttons \\
				// Dismiss \\
					// Add dismiss button to the barPlusElement div
					var dismissBarP=document.createElement("DIV");

					// Style the dismiss button
					dismissBarP.style.width = "100px";
					dismissBarP.style.height = "20px";
					dismissBarP.style.padding = "2px";
					dismissBarP.style.textAlign = "center";
					dismissBarP.style.lineHeight = "20px";
					dismissBarP.style.background ="#fff";
					dismissBarP.style.boxShadow = "0 2px 5px 0 rgba(0, 0, 0, 0.26)";
					dismissBarP.style.margin = "3px";
					dismissBarP.style.cursor = "pointer";
					dismissBarP.style.float = "right";
					dismissBarP.style.marginRight = "10px";
					dismissBarP.style.borderTop = "3px solid #93bfdb";
					dismissBarP.style.borderRadius = "2px";

					// Add functionality to the dismiss button
					dismissBarP.onclick = dismissBarPlus;
					
					// Add text to the dismiss button
					var dismissTxt =  document.createTextNode("Dismiss");
					dismissBarP.appendChild(dismissTxt);

					// Add the dismiss button to the barPlusElement 
					barPlusElement.appendChild(dismissBarP);
				// Dismiss \\
				

				// Adapt \\
					// Add dismiss button to the barPlusElement div
					var adaptZoomBarP=document.createElement("DIV");

					// Style the dismiss button
					adaptZoomBarP.style.width = "100px";
					adaptZoomBarP.style.height = "20px";
					adaptZoomBarP.style.padding = "2px";
					adaptZoomBarP.style.textAlign = "center";
					adaptZoomBarP.style.lineHeight = "20px";
					adaptZoomBarP.style.background ="#fff";
					adaptZoomBarP.style.boxShadow = "0 2px 5px 0 rgba(0, 0, 0, 0.26)";
					adaptZoomBarP.style.margin = "3px";
					adaptZoomBarP.style.cursor = "pointer";
					adaptZoomBarP.style.float = "right";
					adaptZoomBarP.style.marginRight = "10px";
					adaptZoomBarP.style.borderTop = "3px solid #bada55";
					adaptZoomBarP.style.borderRadius = "2px";

					// Add functionality to the dismiss button
					adaptZoomBarP.onclick = adaptUIzoom;
					
					// Add text to the dismiss button
					var adaptZBPtxt =  document.createTextNode("Adapt my UI");
					adaptZoomBarP.appendChild(adaptZBPtxt);

					// Add the dismiss button to the barPlusElement 
					barPlusElement.appendChild(adaptZoomBarP);
				// Adapt \\
			// Buttons \\


			// Add the DIV element to the body of the page
			document.body.appendChild(barPlusElement);

			//ct Bar
			var ctBarPlusElement = barPlusElement;
			document.body.appendChild(ctBarPlusElement);

			// Bar+ functions \\
			function dismissBarPlus(){
				// Dismissing the Bar+ will turn off the notification Bar+
				barPlus = false;
				
				//************** Set Store **************//
				chrome.storage.sync.set({
					barPlus: barPlus
				}, function() {});
			}

			function adaptUIzoom(){
				// Turn on zoom adaptation, and turn off Bar+ notification
				// console.log("Adapting the UI, zoomAdapt is: " + zoomAdapt + " the Bar+ is: " + barPlus);
				zoomAdapt = true;
				barPlus = false;
				
				//************** Set Store **************//
				chrome.storage.sync.set({
					barPlus: barPlus,
					zoomAdapt: zoomAdapt
				}, function() {});

				// Reload the page so the zoom effect starts on the current page 
				// location.reload(true);
			}
			// Bar+ functions \\
		///////////// Bar+ \\\\\\\\\\\\\\\


		///////////// Dialog \\\\\\\\\\\\\\\
			// This is the HTML element for the Bar+ notification 


			// Create a DIV element
			var dialogElement=document.createElement("DIV");
			dialogElement.id = "dialog"
			
			// Hide the Bar+ by default, it will show when triggered 
			dialogElement.style.display = "none";
			
			// Fixed position
			dialogElement.style.position = "fixed";
			// dialogElement.style.margin = "0 0 0 -40%";
			// Top of the page
			var w = window.innerWidth;
			// console.log("width is: " + w);
			var h = window.innerHeight;
			var leftPos = (w/2) - 200;
			// console.log("left position is: " + leftPos);

			dialogElement.style.top = "35%";
			dialogElement.style.left = leftPos+"px";
			// As wide as the page
			dialogElement.style.width = "400px";
			// 3px in height
			dialogElement.style.height= "150px";
			// z-index set to 999 so the DIV would appear on top of other elements of the page
			dialogElement.style.zIndex = "2147483647";
			// Set the background 
			dialogElement.style.background = "#fbfbfb";
			// Set text color
			dialogElement.style.color = "#656565";
			// Set text size
			dialogElement.style.fontSize = "10pt";
			// Set text type
			dialogElement.style.fontFamily = "Helvetica" ;
			// Set bottom border
			dialogElement.style.border = "1px solid #ccc";
			// Set padding
			dialogElement.style.padding = "5px";
			// Add shadow to give layering illusion, this element is on top of the page
			dialogElement.style.boxShadow = "0 8px 17px 0 rgba(0, 0, 0, 0.2)";
			

			// Add logo to Bar+ notification
			var dLogoBP = document.createElement("IMG");
			dLogoBP.src = chrome.extension.getURL("img/newConceptCircleYellow.png");
			dLogoBP.style.display = "block";
			dLogoBP.style.width = "35px";
			dLogoBP.style.height = "35px";
			dLogoBP.style.float = "left";
			dLogoBP.style.marginLeft = "10px";
			dLogoBP.style.marginTop = "7px";

			dialogElement.appendChild(dLogoBP);


			// Add the notification text to the Bar+ element 
			var dNotifBPTxt=document.createElement("DIV");
			dNotifBPTxt.style.display = "block";
			dNotifBPTxt.style.float = "left";
			// dNotifBPTxt.style.clear = "both";
			dNotifBPTxt.style.width = "340px";
			// dNotifBPTxt.style.height = "45px";
			dNotifBPTxt.style.paddingTop = "5px";
			dNotifBPTxt.style.marginLeft = "10px";
			dNotifBPTxt.style.marginBottom = "20px";
			dNotifBPTxt.style.lineHeight = "15px";
			dNotifBPTxt.style.color = "#000";

			dNotifBPTxt.innerHTML = "The webpage you are currently browsing seems to have small, hard to click targets!<br> <br> Would you like the page to be zoomed in for a more enjoyable browsing experience?";
			dialogElement.appendChild(dNotifBPTxt);

			var clear=document.createElement("DIV");
			clear.style.clear= "both";
			dialogElement.appendChild(clear);
			// Buttons \\
				// Dismiss \\
					// Add dismiss button to the dialogElement div
					var dismissDialog=document.createElement("DIV");

					// Style the dismiss button
					dismissDialog.style.width = "100px";
					dismissDialog.style.height = "20px";
					dismissDialog.style.padding = "2px";
					dismissDialog.style.textAlign = "center";
					dismissDialog.style.lineHeight = "20px";
					dismissDialog.style.background ="#fff";
					dismissDialog.style.boxShadow = "0 2px 5px 0 rgba(0, 0, 0, 0.26)";
					dismissDialog.style.margin = "3px";
					dismissDialog.style.marginRight = "90px";
					dismissDialog.style.cursor = "pointer";
					dismissDialog.style.float = "right";
					dismissDialog.style.borderTop = "3px solid #93bfdb";
					dismissDialog.style.borderRadius = "3px";

					// Add functionality to the dismiss button
					dismissDialog.onclick = dismissDialoglus;
					
					// Add text to the dismiss button
					var dismissDTxt =  document.createTextNode("Dismiss");
					dismissDialog.appendChild(dismissDTxt);

					// Add the dismiss button to the dialogElement 
					dialogElement.appendChild(dismissDialog);
				// Dismiss \\
				

				// Adapt \\
					// Add dismiss button to the dialogElement div
					var adaptZoomDialog=document.createElement("DIV");

					// Style the dismiss button
					adaptZoomDialog.style.width = "100px";
					adaptZoomDialog.style.height = "20px";
					adaptZoomDialog.style.padding = "2px";
					adaptZoomDialog.style.textAlign = "center";
					adaptZoomDialog.style.lineHeight = "20px";
					adaptZoomDialog.style.background ="#fff";
					adaptZoomDialog.style.boxShadow = "0 2px 5px 0 rgba(0, 0, 0, 0.26)";
					adaptZoomDialog.style.margin = "3px";
					adaptZoomDialog.style.marginLeft = "90px";
					adaptZoomDialog.style.cursor = "pointer";
					adaptZoomDialog.style.float = "left";
					adaptZoomDialog.style.borderTop = "3px solid #bada55";
					adaptZoomDialog.style.borderRadius = "3px";

					// Add functionality to the dismiss button
					adaptZoomDialog.onclick = adaptUIzoom;
					
					// Add text to the dismiss button
					var adaptZBPtxt =  document.createTextNode("Adapt my UI");
					adaptZoomDialog.appendChild(adaptZBPtxt);

					// Add the dismiss button to the dialogElement 
					dialogElement.appendChild(adaptZoomDialog);
				// Adapt \\
			// Buttons \\


			// Add the DIV element to the body of the page
			document.body.appendChild(dialogElement);

			//ct
			var ctDialogElement = dialogElement;
			document.body.appendChild(ctDialogElement);

			// Dialog functions \\
			function dismissDialoglus(){
					// Dismissing the Bar+ will turn off the notification Bar+
					dialogBox = false;
					
					//************** Set Store **************//
					chrome.storage.sync.set({
						dialogBox: dialogBox
					}, function() {});
				}

			function adaptUIzoom(){
				// Turn on zoom adaptation, and turn off Bar+ notification
				// console.log("Adapting the UI, zoomAdapt is: " + zoomAdapt + " the Bar+ is: " + dialogBox);
				zoomAdapt = true;
				dialogBox = false;
				
				//************** Set Store **************//	
				chrome.storage.sync.set({
					dialogBox: dialogBox,
					zoomAdapt: zoomAdapt
				}, function() {});

				// Reload the page so the zoom effect starts on the current page 
				// location.reload(true);
			}
			// dialog functions \\
		///////////// Dialog \\\\\\\\\\\\\\\
	///////////// Feedback HTML elements \\\\\\\\\\\\\\\


	///////////// Functions for notifications and adaptations \\\\\\\\\\\\\\\
	function notification(){
		//************** Get Store **************//	
		  chrome.storage.sync.get(null, function(items) { // null implies all items
		  	//scr
		  	var scrRel = items.scrRel;
		  	var scrViz = items.scrViz;
		  	var posTop = items.posTop;
		  	var posBtm = items.posBtm;
		  	var scrThick = items.scrThick;
		  	var scrBarColor = items.scrBarColor;
		  	var total_clicks = items.t_num_clicks;
		  	var total_slips  = items.t_num_slips;
		  	console.log("clicks" + total_clicks);
		  	console.log("slips" + total_slips);

		  	var scrRatio = (total_slips/total_clicks) * 100;
		  	//ct
		  	var ctRel = items.ctRel;
		  	var ctViz = items.ctViz;
		  	var ctPosTop = items.ctPosTop;
		  	var ctPosBtm = items.ctPosBtm;
		  	var ctThick = items.ctThick;
		  	var ctBarColor = items.ctBarColor;
		  	var clickTiming = items.click_durations;
		  	//convert clicktiming into seconds
		  	clickTiming = clickTiming/1000;

		  	console.log("***** scr Var values *****");
		  	console.log("scrFlag: " + items.scrFlag);
		  	console.log("scrRel: " + scrRel);
			console.log("scrValue: " + items.scrValue);
			console.log("scrViz: " + items.scrViz);
			console.log("scrPosTop: " + posTop);
			console.log("scrPosBtm: " + posBtm);
			console.log("scrBarColor: " + scrBarColor);
			console.log("scrThick: " + scrThick);
			console.log("slip/click: " + scrRatio);

		  	console.log("***** ct Var values *****");
		  	console.log("ctFlag: " + items.ctFlag);
		  	console.log("ctRel: " + ctRel);
			console.log("ctValue: " + items.ctValue);
			console.log("ctViz: " + items.ctViz);
			console.log("ctPosTop: " + ctPosTop);
			console.log("ctPosBtm: " + ctPosBtm);
			console.log("ctBarColor: " + ctBarColor);
			console.log("ctThick: " + ctThick);
			console.log("clickTiming: " + clickTiming);

			//scr
		  	if (items.scrFlag && 
		  		((scrRel === "gt" && scrRatio > items.scrValue) ||
		  		(scrRel === "lt" && scrRatio < items.scrValue) ||
		  		(scrRel === "et" && scrRatio == items.scrValue))) {
		  		
		  		/////////// Bar notification \\\\\\\\\\
		  		if (scrViz === "scrBar") {
					console.log("In scrBar...");

					// turn on Bar notification only if there is an ineffective click
						barElement.style.display = "block";
						
						// Position
						if(posTop === true) {
							barElement.style.top = "0px";
						} else {
							barElement.style.bottom = "0px";
						}
						
						// thickness
						barElement.style.height= scrThick + "px";

						//color
						barElement.style.background = scrBarColor;

						document.documentElement.style.position = "relative";
						document.documentElement.style.top = "5px";
					// }

					}
				else {
					// turn off Bar notification
					barElement.style.display = "none";
					barElement.style.background = "#b639f9";
					document.documentElement.style.position = "relative";
					document.documentElement.style.top = "3px";
					
				}
				/////////// Bar notification \\\\\\\\\\

				/////////// Bar+ notification \\\\\\\\\\
				if (scrViz === "scrBarPlus") {
					// turn on Bar+ notification

					// if (classification === 1 ){
						// If the click was classified as ineffective show the Bar+ notification. 
						barPlusElement.style.display = "block";
						barPlusElement.style.background = "#bada55";
						barPlusElement.style.background = "#efefef";
						document.documentElement.style.position = "relative";
						document.documentElement.style.top = "45px";
					// }
				}
				else {
					// turn off Bar+ notification

					barPlusElement.style.display = "none";
					barPlusElement.style.background = "#efefef";
					document.documentElement.style.position = "relative";
					document.documentElement.style.top = "0";
				}
				/////////// Bar+ notification \\\\\\\\\\

				/////////// Dialog box notification \\\\\\\\\\
				if (scrViz === "scrDialog") {
					// turn on Bar+ notification

					// if (classification === 1 ){
						// If the click was classified as ineffective show the Bar+ notification. 
						dialogElement.style.display = "block";
						dialogElement.style.background = "#bada55";
						dialogElement.style.background = "#efefef";

					// }
					}
				else {
					// turn off Bar+ notification

					dialogElement.style.display = "none";
					dialogElement.style.background = "#efefef";
				}

				/////////// Dialog box notification \\\\\\\\\\
			}


			//ct
			if (items.ctFlag && 
		  		((ctRel === "gt" && clickTiming > items.ctValue) ||
		  		(ctRel === "lt" && clickTiming < items.ctValue) ||
		  		(ctRel === "et" && clickTiming == items.ctValue))) {
		  		
		  		/////////// Bar notification \\\\\\\\\\
		  		if (ctViz === "ctBar") {
					console.log("In CtBar...");

					// turn on Bar notification only if there is an ineffective click
					ctBarElement.style.display = "block";
					
					console.log("ct Pos Top" + ctPosTop);
					// Position
					if(ctPosTop === true) {
						ctBarElement.style.top = "0px";
					} else {
						ctBarElement.style.bottom = "0px";
					}

					// thickness
					ctBarElement.style.height= ctThick + "px";

					//color
					ctBarElement.style.background = ctBarColor;

					document.documentElement.style.position = "relative";
					document.documentElement.style.top = "5px";
				}
				else {
					// turn off Bar notification
					ctBarElement.style.display = "none";
					ctBarElement.style.background = "#b639f9";
					document.documentElement.style.position = "relative";
					document.documentElement.style.top = "3px";
					
				}
				/////////// Bar notification \\\\\\\\\\

				/////////// Bar+ notification \\\\\\\\\\
				if (ctViz === "ctBarPlus") {
					// turn on Bar+ notification

					// if (classification === 1 ){
						// If the click was classified as ineffective show the Bar+ notification. 
						ctBarPlusElement.style.display = "block";
						ctBarPlusElement.style.background = "#bada55";
						ctBarPlusElement.style.background = "#efefef";
						document.documentElement.style.position = "relative";
						document.documentElement.style.top = "45px";
					// }
				}
				else {
					// turn off Bar+ notification

					ctBarPlusElement.style.display = "none";
					ctBarPlusElement.style.background = "#efefef";
					document.documentElement.style.position = "relative";
					document.documentElement.style.top = "0";
				}
				/////////// Bar+ notification \\\\\\\\\\

				/////////// Dialog box notification \\\\\\\\\\
				if (ctViz === "ctDialog") {
					// turn on Bar+ notification

					// if (classification === 1 ){
						// If the click was classified as ineffective show the Bar+ notification. 
						ctDialogElement.style.display = "block";
						ctDialogElement.style.background = "#bada55";
						ctDialogElement.style.background = "#efefef";

					// }
					}
				else {
					// turn off Bar+ notification

					ctDialogElement.style.display = "none";
					ctDialogElement.style.background = "#efefef";
				}

				/////////// Dialog box notification \\\\\\\\\\
			}

			console.log("items.slip_prefAdapt");
			console.log(items.slip_prefAdapt);
			if (scrRatio >= items.slip_prefAdapt) {
				console.log("Requirment met to adapt");
				adaptUIzoom();
				adaptToZoome();
			}
		});	
}

function adaptToZoome(){
	var x = document.getElementsByTagName("BODY")[0];
	var zoom = x.style.zoom;
	x.style.zoom = 1.5;	
}
	///////////// Functions for notifications and adaptations \\\\\\\\\\\\\\\

////////////////////////////////////////// Notifications And Adaptations \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

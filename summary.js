//scr
var scrFlag;
var ctFlag;
var scrText = "Slip/Click";
scrText = scrText.bold();
scrText +=  " ratio is ";

var ctText = "Click Timing";
ctText = ctText.bold();
ctText +=  " is ";

var counter = 0;

chrome.storage.sync.get(null, function(items) {
	scrFlag = items.scrFlag;
	ctFlag = items.ctFlag;

	if(!scrFlag && !ctFlag) {
		console.log("No subscribed notifications.");
	}
	else {
		if(scrFlag) {
			counter++;

			var scrCardDiv = document.createElement("DIV");
			scrCardDiv.className = "summary-card";

			//counter
			var scrCounterDiv = document.createElement("DIV");
			scrCounterDiv.className = "counter";
			scrCounterDiv.innerHTML = counter;

			var scrSummaryDiv = document.createElement("DIV");
			scrSummaryDiv.className = "summary";
			
			//start creating the summary message string
			var summary = scrText;

			//relation
			if(items.scrRel === "gt") {
				summary += "greater than ";
			} else if(items.scrRel === "et") {
				summary += "equal to ";
			} else {
				summary += "less than ";
			}
			var scrRelValue = items.scrValue.toString().bold();
			summary += scrRelValue + " using a ";

			//viz type
			if(items.scrViz === "scrBar") {
				var scrVizValue = "Bar";
				summary += scrVizValue.bold();
			} else if(items.scrViz === "scrBarPlus") {
				var scrVizValue = "Bar+";
				summary += scrVizValue.bold();
			} else if(items.scrViz === "scrDialog"){
				var scrVizValue = "Dialog Box";
				summary += scrVizValue.bold();
			}

			summary += " having ";

			//position
			summary += "position as ";
			if(items.scrPos === "posTop") {
				var scrPosValue = "Top";
				summary += scrPosValue.bold();
			} else {
				var scrPosValue = "Bottom";
				summary += scrPosValue.bold();
			}
			summary += ", ";

			//color
			var scrBarColorValue = items.scrBarColor.toString();
			scrBarColorValue.fontcolor(scrBarColorValue);
			summary += "color as " + scrBarColorValue.bold();

			summary += " and ";

			//thickness
			summary += "thickness as ";
			var scrThickValue = items.scrThick;
			scrThickValue = scrThickValue.bold();
			summary += scrThickValue + ".";
			
			scrSummaryDiv.innerHTML = summary;

			scrCardDiv.appendChild(scrCounterDiv);
			scrCardDiv.appendChild(scrSummaryDiv);

			document.getElementById("card-container").appendChild(scrCardDiv);
		}
		if(ctFlag) {
			counter++;

			var ctCardDiv = document.createElement("DIV");
			ctCardDiv.className = "summary-card";

			//counter
			var ctCounterDiv = document.createElement("DIV");
			ctCounterDiv.className = "counter";
			ctCounterDiv.innerHTML = counter;

			var ctSummaryDiv = document.createElement("DIV");
			ctSummaryDiv.className = "summary";
			
			//start creating the summary message string
			var summary = ctText;

			//relation
			if(items.ctRel === "gt") {
				summary += "greater than ";
			} else if(items.ctRel === "et") {
				summary += "equal to ";
			} else {
				summary += "less than ";
			}
			var ctRelValue = items.ctValue.toString().bold();
			summary += ctRelValue + " using a ";

			//viz type
			if(items.ctViz === "ctBar") {
				var ctVizValue = "Bar";
				summary += ctVizValue.bold();
			} else if(items.ctViz === "ctBarPlus") {
				var ctVizValue = "Bar+";
				summary += ctVizValue.bold();
			} else if(items.ctViz === "ctDialog"){
				var ctVizValue = "Dialog Box";
				summary += ctVizValue.bold();
			}

			summary += " having ";

			//position
			summary += "position as ";
			if(items.ctPos === "ctPosTop") {
				var ctPosValue = "Top";
				summary += ctPosValue.bold();
			} else {
				var ctPosValue = "Bottom";
				summary += ctPosValue.bold();
			}
			summary += ", ";

			//color
			var ctBarColorValue = items.ctBarColor.toString();
			ctBarColorValue.fontcolor(ctBarColorValue);
			summary += "color as " + ctBarColorValue.bold();

			summary += " and ";

			//thickness
			summary += "thickness as ";
			var ctThickValue = items.ctThick;
			ctThickValue = ctThickValue.bold();
			summary += ctThickValue + ".";
			
			ctSummaryDiv.innerHTML = summary;

			ctCardDiv.appendChild(ctCounterDiv);
			ctCardDiv.appendChild(ctSummaryDiv);

			document.getElementById("card-container").appendChild(ctCardDiv);
		}
	}

});
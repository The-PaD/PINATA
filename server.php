<?php
/*
* @Author            : Abdullah Ali, Tejas Bhalerao
* @Date              : 2017-05-29 00:42:30
* @Description       : This script is used to receive and save the user's data to the server in a file
* @Last Modified by  : Tejas
* @Last Modified time: 2017-05-29 01:11:18
* @Contact           : @xyleques, xyleques@me.com; tejasbhalerao01@gmail.com
* @version           : 2
*/

echo "Well, hi there! I got ".count($_POST)." entries!";

$batchSize = $_POST['batchSize'];
$writeCounter = $_POST['writeCounter'];

//metric name followed by its (unit)
$header = "batch#, user id, current url, interaction type, timeStamp, pointer x (px), pointer y (px), target, target ID, target height (px), target width (px), target tag, target left pos (px), target top pos (px), target area (square px), target center x (px), target center y (px), precision (px), relative precision, window height (px), window width (px), #clicks, #slips, click duration (ms), pause duration(ms), scr flag (t/f), scr relation (gt/et/lt), scr value (px), scr viz (bar/bar+/dialog box), scr top position (px), scr bottom position (px), scr thickness (px), scr bar color, ct flag (t/f), ct relation (gt/et/lt), ct value (px), ct viz (bar/bar+/dialog box), ct top position (px), ct bottom position (px), ct thickness (px), ct bar color, pt flag (t/f), pt relation (gt/et/lt), pt value (px), pt viz (bar/bar+/dialog box), pt top position (px), pt bottom position (px), pt thickness (px), pt bar color\n";

for ($i=0; $i < $batchSize; $i++) { 
	$data .=	
		//batch #
		$_POST['writeCounter']. ", ".
		//user id
		$_POST['user']. ", ".
		//mouse movement data
		$_POST['url'][$i] . ", ".
		$_POST['type'][$i] . ", ".
		$_POST['timeStamp'][$i] . ", ".
		$_POST['x'][$i] . ", ".
		$_POST['y'][$i] . ", ".
		$_POST['targets'][$i] . ", ".
		$_POST['tID'][$i] . ", ".
		$_POST['heights'][$i] . ", ".
		$_POST['widths'][$i] . ", ".
		$_POST['tags'][$i] . ", ".
		$_POST['left'][$i] . ", ".
		$_POST['top'][$i] . ", ".
		$_POST['area'][$i] . ", ".
		$_POST['Center_X'][$i] . ", ".
		$_POST['Center_Y'][$i] . ", ".
		$_POST['precision'][$i] . ", ".
		$_POST['relPrecision'][$i] . ", ".
		$_POST['win_height'][$i] . ", ".
		$_POST['win_width'][$i] . ", ".
		$_POST['num_clicks'] . ", ".
		$_POST['slips'][$i] . ", ".
		$_POST['click_durations'][$i] . ", ".
		$_POST['pause'][$i] . ", ".
		//metrics data
		//scr
		$_POST['scrFlag'] . ", ".
		$_POST['scrRel']. ", ".
		$_POST['scrValue']. ", ".
		$_POST['scrViz']. ", ".
		$_POST['posTop']. ", ".
		$_POST['posBtm']. ", ".				
		$_POST['scrThick']. ", ".
		$_POST['scrBarColor']. ", ".
		//ct
		$_POST['ctFlag']. ", ".
		$_POST['ctRel']. ", ".
		$_POST['ctValue']. ", ".
		$_POST['ctViz']. ", ".
		$_POST['ctPosTop']. ", ".
		$_POST['ctPosBtm']. ", ".				
		$_POST['ctThick']. ", ".
		$_POST['ctBarColor']. ", ".
		//pt
		$_POST['ptFlag']. ", ".
		$_POST['ptRel']. ", ".
		$_POST['ptValue']. ", ".
		$_POST['ptViz']. ", ".
		$_POST['ptPosTop']. ", ".
		$_POST['ptPosBtm']. ", ".				
		$_POST['ptThick']. ", ".
		$_POST['ptBarColor']. "\n";
}

//add header to the file only once
if($writeCounter == 1) {
	$content = $header.$data;
} else {
	$content = $data;
}

// $myfile = file_put_contents('serverLogs.txt', "-------------GET-------------" , FILE_APPEND);
// $myfile = file_put_contents('serverLogs.txt', print_r($_GET, true) , FILE_APPEND);
// $myfile = file_put_contents('serverLogs.txt', "-------------POST-------------" , FILE_APPEND);
// $myfile = file_put_contents('serverLogs.txt', print_r($_POST, true) , FILE_APPEND);
// $myfile = file_put_contents('serverLogs.csv', $content , FILE_APPEND);
$myfile = file_put_contents('pinataTest.csv', $content, FILE_APPEND);
?>
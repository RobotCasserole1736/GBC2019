/*
 * GreenBean.js
 *
 */


window.onload=function(){updateData()};

var Score_Stack = new Array();
Score_Stack['sandstorm'] = new Array();
Score_Stack['teleop'] = new Array();

var Score_Stack = new Array();
Score_Stack['sandstorm'] = new Array();
Score_Stack['teleop'] = new Array();

var penalty_stack = new Array();

var overallRatingText = ["Do Not Pick", "Below Average", "Average", "Top Team"];
var defenseRatingText = ["Awful/none", "It's not very effective...", "Average", "It's super effective!"];
var driverRatingText = ["Little or No Movement", "Poor Driving", "Good Driving", "Exceptional Driving"];


var unsubmittedData = new Array();

document.addEventListener("keydown",function(){
	keyReader(event);
});



function keyReader(evt) {
	periodreader=document.getElementsByClassName("active")[0].getAttribute("href")

	if(periodreader=='#SandstormData'){
		period='sandstorm';
	}
	else if(periodreader=='#TeleoperatedData'){
		period='teleop'
	}else{
		period='none'
	}

	evt = evt || window.event;
	if(period!='none'){
		//Q key
		if (evt.keyCode == 81) {
			cargoScore(period, 'cargo ship', 1);
		}
		//W key
		else if (evt.keyCode == 87) {
			cargoScore(period, 'low', 1);
		}
		//E key
		else if (evt.keyCode == 69) {
			cargoScore(period, 'middle', 1);
		}
		//R key
		else if (evt.keyCode == 82) {
			cargoScore(period, 'high', 1);
		}
		//A key
		else if (evt.keyCode == 65) {
			hatchScore(period, 'cargo ship', 1);
		}
		//S key
		else if (evt.keyCode == 83) {
			hatchScore(period, 'low', 1);
		}
		//D key
		   else if (evt.keyCode == 68) {
			hatchScore(period, 'middle', 1);
		}
		//F key
		else if (evt.keyCode == 70) {
			hatchScore(period, 'high', 1);
		}
		//J key
		else if (evt.keyCode == 74) {
			penalty(period, 'penalty');
		}
		//K key
		else if (evt.keyCode == 75) {
			penalty(period, 'technical');
		}
		//Space key
		else if (evt.keyCode == 32) {
		}
		//Z key
		else if (evt.keyCode == 90) {
			undoCargoScore(period);
		}
		//X key
		else if (evt.keyCode == 88) {
			undoPenalty();
		}
	}
}
function cargoScore(period, type, count){
	Score_Stack[period].push([type,count]);
	updateData();
};

function undoScore(period){
	Score_Stack[period].pop();
	updateData();
};

function hatchScore(period, type, count){
	Score_Stack[period].push([type,count]);
	updateData();
};

function undoGearScore(period){
	Score_Stack[period].pop();
	updateData();
};

function penalty(period, type){
    penalty_stack.push([type,period]);
	updateData();
};

function undoPenalty(){
	penalty_stack.pop();
    
    updateData();
};


/*
 * Update Data from input elements
 */
function updateData()
{
	var sandstormCargoShipCount_Cargo = 0;
	var sandstormRocketHighCount_Cargo = 0;
	var sandstormRocketMiddleCount_Cargo = 0;
	var sandstormRocketLowCount_Cargo = 0;
	var sandstormCargoShipCount_Hatch = 0;
	var sandstormRocketHighCount_Hatch = 0;
	var sandstormRocketMiddleCount_Hatch = 0;
	var sandstormRocketLowCount_Hatch = 0;
	var teleopCargoShipCount_Cargo = 0;
	var teleopRocketHighCount_Cargo = 0;
	var teleopRocketMiddleCount_Cargo = 0;
	var teleopRocketLowCount_Cargo = 0;
	var teleopCargoShipCount_Hatch = 0;
	var teleopRocketHighCount_Hatch = 0;
	var teleopRocketMiddleCount_Hatch = 0;
	var teleopRocketLowCount_Hatch = 0;
	
	for(var i = 0; i< Score_Stack['sandstorm'].length; i++){
		if(Score_Stack['sandstorm'][i][0] == 'cargo ship')
			sandstormCargoShipCount_Cargo += 1;
		else if(Score_Stack['sandstorm'][i][0] == 'cargo high')
			sandstormRocketHighCount_Cargo += 1;
		else if(Score_Stack['sandstorm'][i][0] == 'cargo middle')
			sandstormRocketMiddleCount_Cargo += 1;
		else if(Score_Stack['sandstorm'][i][0] == 'cargo low')
			sandstormRocketLowCount_Cargo += 1;
	}
	for(var i = 0; i< Score_Stack['sandstorm'].length; i++){
		if(Score_Stack['sandstorm'][i][0] == 'hatch cargo ship')
			sandstormCargoShipCount_Hatch += 1;
		else if(Score_Stack['sandstorm'][i][0] == 'hatch high')
			sandstormRocketHighCount_Hatch += 1;
		else if(Score_Stack['sandstorm'][i][0] == 'hatch middle')
			sandstormRocketMiddleCount_Hatch += 1;
		else if(Score_Stack['sandstorm'][i][0] == 'hatchlow')
			sandstormRocketLowCount_Hatch += 1;
	}
	for(var i = 0; i< Score_Stack['teleop'].length; i++){
		if(Score_Stack['teleop'][i][0] == 'cargo ship')
			teleopCargoShipCount_Cargo += Score_Stack['teleop'][i][1];
		else if(Score_Stack['teleop'][i][0] == 'cargo high')
			teleopRocketHighCount_Cargo += Score_Stack['teleop'][i][1];
		else if(Score_Stack['teleop'][i][0] == 'cargo middle')
			teleopRocketMiddleCount_Cargo += Score_Stack['teleop'][i][1];
		else if(Score_Stack['teleop'][i][0] == 'cargo low')
			teleopRocketLowCount_Cargo += Score_Stack['teleop'][i][1];
	}
	for(var i = 0; i< Score_Stack['teleop'].length; i++){
		if(Score_Stack['teleop'][i][0] == 'hatch cargo ship')
			teleopCargoShipCount_Hatch += Score_Stack['teleop'][i][1];
		else if(Score_Stack['teleop'][i][0] == 'hatch high')
			teleopRocketHighCount_Hatch += Score_Stack['teleop'][i][1];
		else if(Score_Stack['teleop'][i][0] == 'hatch middle')
			teleopRocketMiddleCount_Hatch += Score_Stack['teleop'][i][1];
		else if(Score_Stack['teleop'][i][0] == 'hatch low')
			teleopRocketLowCount_Hatch += Score_Stack['teleop'][i][1];
	}

	var penaltyCount = 0;
	var technicalCount = 0;
	for(var i=0; i< penalty_stack.length; i++){
		if(penalty_stack[i][0] == 'penalty')
			penaltyCount++;
		else
			technicalCount++;
	}		
	// sandstorm data
	document.getElementById('cargoInCargoShipScoredSandstormDisplay').innerHTML = sandstormCargoShipCount_Cargo;
	document.getElementById('cargoInHighRocketScoredSandstormDisplay').innerHTML = sandstormRocketHighCount_Cargo;
	document.getElementById('cargoInMiddleRocketScoredSandstormDisplay').innerHTML = sandstormRocketMiddleCount_Cargo;
	document.getElementById('cargoInLowRocketScoredSandstormDisplay').innerHTML = sandstormRocketLowCount_Cargo;

	document.getElementById('hatchInCargoShipScoredSandstormDisplay').innerHTML = sandstormCargoShipCount_Hatch;
	document.getElementById('hatchInHighRocketScoredSandstormDisplay').innerHTML = sandstormRocketHighCount_Hatch;
	document.getElementById('hatchInMiddleRocketScoredSandstormDisplay').innerHTML = sandstormRocketMiddleCount_Hatch;
	document.getElementById('hatchInLowRocketScoredSandstormDisplay').innerHTML = sandstormRocketLowCount_Hatch;
	
	document.getElementById('penaltyDisplaySandstorm').innerHTML = penaltyCount;
	document.getElementById('technicalDisplaySandstorm').innerHTML = technicalCount;
	// teleop data
	document.getElementById('cargoInCargoShipScoredTeleopDisplay').innerHTML = teleopCargoShipCount_Cargo;
	document.getElementById('cargoInHighRocketScoredTeleopDisplay').innerHTML = teleopRocketHighCount_Cargo;
	document.getElementById('cargoInMiddleRocketScoredTeleopDisplay').innerHTML = teleopRocketMiddleCount_Cargo;
	document.getElementById('cargoInLowRocketScoredTeleopDisplay').innerHTML = teleopRocketLowCount_Cargo;

	document.getElementById('hatchInCargoShipScoredTeleopDisplay').innerHTML = teleopCargoShipCount_Hatch;
	document.getElementById('hatchInHighRocketScoredTeleopDisplay').innerHTML = teleopRocketHighCount_Hatch;
	document.getElementById('hatchInMiddleRocketScoredTeleopDisplay').innerHTML = teleopRocketMiddleCount_Hatch;
	document.getElementById('hatchInLowRocketScoredTeleopDisplay').innerHTML = teleopRocketLowCount_Hatch;
	
	document.getElementById('penaltyDisplayTele').innerHTML = penaltyCount;
	document.getElementById('technicalDisplayTele').innerHTML = technicalCount;
	document.getElementById('climbTime').innerHTML = document.getElementById('climbSpeedSlider').value + ' seconds';
	// Post match data
	document.getElementById('overallRatingDisplay').innerHTML = overallRatingText[parseInt(document.getElementById('overallRating').value)];
	document.getElementById('defenseRatingDisplay').innerHTML = defenseRatingText[parseInt(document.getElementById('defenseRating').value)];
	document.getElementById('driverRatingDisplay').innerHTML = driverRatingText[parseInt(document.getElementById('driverRating').value)];
	

}



function saveData()
{
	var matchData = document.getElementById("scoutName").value + ",";
	matchData += document.getElementById("teamNumber").value + ",";
	matchData += document.getElementById("matchNumber").value + ",";
	matchData += document.getElementById("matchType").value + ",";

	// sandstorm tab fields
	matchData += document.getElementById('cargoInCargoShipScoredSandstormDisplay').innerHTML + ",";
	matchData += document.getElementById('cargoInHighRocketScoredSandstormDisplay').innerHTML + ",";
	matchData += document.getElementById('cargoInMiddleRocketScoredSandstormDisplay').innerHTML + ",";
	matchData += document.getElementById('cargoInLowRocketScoredSandstormDisplay').innerHTML + ",";

	matchData += document.getElementById('hatchInCargoShipScoredSandstormDisplay').innerHTML + ",";
	matchData += document.getElementById('hatchInHighRocketScoredSandstormDisplay').innerHTML + ",";
	matchData += document.getElementById('hatchInMiddleRocketScoredSandstormDisplay').innerHTML + ",";
	matchData += document.getElementById('hatchInLowRocketScoredSandstormDisplay').innerHTML + ",";
	
	matchData += samdstormHatch[0] + "," + samdstormHatch[1] + ",";
	if(document.getElementById("startingPositionLevel1").checked)
		matchData += "Lv1,";
	else if(document.getElementById("startingPositionLevel2").checked)
		matchData += "Lv2,";

	matchData += document.getElementById("crossedBaseline").checked + ",";
	matchData += document.getElementById("hopperPushedSandstorm").checked + ",";


	// teleop tab fields
	matchData += document.getElementById('cargoInCargoShipScoredTeleopDisplay').innerHTML + ",";
	matchData += document.getElementById('cargoInHighRocketScoredTeleopDisplay').innerHTML + ",";
	matchData += document.getElementById('cargoInMiddleRocketScoredTeleopDisplay').innerHTML + ",";
	matchData += document.getElementById('cargoInLowRocketScoredTeleopDisplay').innerHTML + ",";

	matchData += document.getElementById('hatchInCargoShipScoredTeleopDisplay').innerHTML + ",";
	matchData += document.getElementById('hatchInHighRocketScoredTeleopDisplay').innerHTML + ",";
	matchData += document.getElementById('hatchInMiddleRocketScoredTeleopDisplay').innerHTML + ",";
	matchData += document.getElementById('hatchInLowRocketScoredTeleopDisplay').innerHTML + ",";
	
	matchData += document.getElementById("shootingAccuracy").value + ",";
	matchData += document.getElementById("groundPickupFuel").checked + ",";

	matchData += teleGears[0] + "," + teleGears[1] + ",";
	matchData += document.getElementById("groundPickupGear").checked + ",";
	matchData += document.getElementById("drivingAbility").value + ",";
	matchData += document.getElementById("defenseAbility").value + ",";
	matchData += document.getElementById("climbAttempt").checked + ",";
	matchData += document.getElementById("climbSuccess").checked + ",";
	matchData += document.getElementById("climbSpeedSlider").value + ",";

	// penalties
	matchData += document.getElementById("penaltyDisplayTele").innerHTML + ",";
	matchData += document.getElementById("technicalDisplayTele").innerHTML + ",";

	// post match fields
	matchData += document.getElementById("humanPlayerAbility").checked + ",";
	matchData += document.getElementById("pilotAbility").checked + ",";
	matchData += document.getElementById("overallRating").value + ",";
	matchData += document.getElementById("driveRating").value +",";
	matchData += document.getElementById("defenseRating").value +",";
	
	var comments = document.getElementById("comments").value;
	comments = comments.replace(",","_"); //Get rid of commas so we don't mess up CSV
	comments = comments.replace(/(\r\n|\n|\r)/gm,"  ");  // get rid of any newline characters
	matchData += comments + "\n";  // add a single newline at the end of the data
	var existingData = localStorage.getItem("MatchData");
	if(existingData == null)
		localStorage.setItem("MatchData", matchData);
	else
		localStorage.setItem("MatchData", existingData + matchData);
	document.getElementById("HistoryCSV").value = localStorage.getItem("MatchData");
	serverSubmit(matchData);
}

//Clears all data in the form.
//Do not call this unless it is ok to actually clear all data.
//This only resets stuff Nick felt should be reset
function resetForm()
{
	// match data reset
	document.getElementById("teamNumber").value = "";
	document.getElementById("matchNumber").value = parseInt(document.getElementById("matchNumber").value) + 1;

	// sandstorm data reset
	fuel_Stack['sandstorm'] = new Array();
	Score_Stack['sandstorm'] = new Array();
	document.getElementById("startingPositionBoiler").checked = false;
	document.getElementById("startingPositionCenter").checked = false;
	document.getElementById("startingPositionLoading").checked = false;
	document.getElementById("startingPositionLoading").checked = false;
	document.getElementById("startingPositionLoading").checked = false;
	document.getElementById("crossedBaseline").checked = false;
	document.getElementById("hopperPushedSandstorm").checked = false;

	// teleop data reset
	fuel_Stack['teleop'] = new Array();
	Score_Stack['teleop'] = new Array();
	document.getElementById("shootingAccuracy").value = 0;
	document.getElementById("groundPickupFuel").checked = false;
	document.getElementById("groundPickupGear").checked = false;
	document.getElementById("drivingAbility").value = 0;
	document.getElementById("defenseAbility").value = 0;
	document.getElementById("climbAttempt").checked = false;
	document.getElementById("climbSuccess").checked = false;
	document.getElementById("climbSpeedSlider").value = 0;

	//post match data reset
	document.getElementById("humanPlayerAbility").checked = false;
	document.getElementById("pilotAbility").checked = false;
	document.getElementById("overallRating").value = 0;
	document.getElementById("comments").value = "";

	// penalties reset
	penalty_stack = new Array();

	// update all data displays(counts, text, etc)
	updateData();
}


function submitReport()
{
	saveData();
	resetForm();
}

function clearHistory()
{
	if(document.getElementById("history_password").value == "Beans")
	{
		localStorage.clear();
		document.getElementById("HistoryCSV").value = "";
		$("#HistoryPass").hide(100,null);
	}
	else
	{
		document.getElementById("history_password").value = "Incorrect Password";
	}
}

function serverSubmit(matchData)
{
    var xmlhttp = new XMLHttpRequest();

    var sendData = "matchData=";
    sendData += matchData;

    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            if(xmlhttp.status == 200)
            {
                if(unsubmittedData.length > 0)
                    serverSubmit(unsubmittedData.pop());
                return;
            }
            else
            {
                alert("Error submitting data - check that server is up!");
                unsubmittedData.push(matchData);
            }
        }
    };

    xmlhttp.open("GET", "logMatches.php?" + sendData, true);
    xmlhttp.send();
}
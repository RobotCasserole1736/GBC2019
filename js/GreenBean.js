/*
 * GreenBean.js
 *
 */


window.onload=function(){updateData()};

var cargo_Stack = new Array();
cargo_Stack['sandstorm'] = new Array();
cargo_Stack['teleop'] = new Array();

var gear_Stack = new Array();
gear_Stack['sandstorm'] = new Array();
gear_Stack['teleop'] = new Array();

var penalty_stack = new Array();

var teleDrivingText = ["Little or No Movement", "Poor Driving", "Good Driving", "Exceptional Driving"];
var defenseText = ["Awful/none", "It's not very effective...", "Average", "It's super effective!"];
var overallRatingText = ["Do Not Pick", "Below Average", "Average", "Top Team"];

var unsubmittedData = new Array();

function cargoScore(period, type, count){
	cargo_Stack[period].push([type,count]);
	updateData();
};

function undoCargoScore(period){
	cargo_Stack[period].pop();
	updateData();
};

function gearScore(period, location){
	gear_Stack[period].push(location);
	updateData();
};

function undoGearScore(period){
	gear_Stack[period].pop();
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
	var teleopCargoShipCount_Cargo = 0;
	var teleopRocketHighCount_Cargo = 0;
	var teleopRocketMiddleCount_Cargo = 0;
	var teleopRocketLowCount_Cargo = 0;
	
	for(var i = 0; i< cargo_Stack['sandstorm'].length; i++){
		if(cargo_Stack['sandstorm'][i][0] == 'cargo ship')
			sandstormCargoShipCount_Cargo += cargo_Stack['sandstorm'][i][1];
		else if(cargo_Stack['sandstorm'][i][0] == 'high')
			sandstormRocketHighCount_Cargo += cargo_Stack['sandstorm'][i][1];
		else if(cargo_Stack['sandstorm'][i][0] == 'middle')
			sandstormRocketMiddleCount_Cargo += cargo_Stack['sandstorm'][i][1];
		else if(cargo_Stack['sandstorm'][i][0] == 'low')
			sandstormRocketLowCount_Cargo += cargo_Stack['sandstorm'][i][1];
	}
	for(var i = 0; i< cargo_Stack['teleop'].length; i++){
		if(cargo_Stack['teleop'][i][0] == 'cargo ship')
			teleopCargoShipCount_Cargo += cargo_Stack['teleop'][i][1];
		else if(cargo_Stack['teleop'][i][0] == 'high')
			teleopRocketHighCount_Cargo += cargo_Stack['teleop'][i][1];
		else if(cargo_Stack['teleop'][i][0] == 'middle')
			teleopRocketMiddleCount_Cargo += cargo_Stack['teleop'][i][1];
		else if(cargo_Stack['teleop'][i][0] == 'low')
			teleopRocketLowCount_Cargo += cargo_Stack['teleop'][i][1];
	}
	var sandstormGearCount = gear_Stack['sandstorm'].length;
	var teleopGearCount = gear_Stack['teleop'].length;
	
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
	
	document.getElementById('gearsDisplaySandstorm').innerHTML = sandstormGearCount;
	document.getElementById('penaltyDisplaySandstorm').innerHTML = penaltyCount;
	document.getElementById('technicalDisplaySandstorm').innerHTML = technicalCount;
	// teleop data
	document.getElementById('cargoInCargoShipScoredTeleopDisplay').innerHTML = teleopCargoShipCount_Cargo;
	document.getElementById('cargoInHighRocketScoredTeleopDisplay').innerHTML = teleopRocketHighCount_Cargo;
	document.getElementById('cargoInMiddleRocketScoredTeleopDisplay').innerHTML = teleopRocketMiddleCount_Cargo;
	document.getElementById('cargoInLowRocketScoredTeleopDisplay').innerHTML = teleopRocketLowCount_Cargo;
	
	document.getElementById('gearsDisplayTele').innerHTML = teleopGearCount;
	document.getElementById('penaltyDisplayTele').innerHTML = penaltyCount;
	document.getElementById('technicalDisplayTele').innerHTML = technicalCount;
	document.getElementById('drivingDisplay').innerHTML = teleDrivingText[parseInt(document.getElementById('drivingAbility').value)];
	document.getElementById('defenseDisplay').innerHTML = defenseText[parseInt(document.getElementById('defenseAbility').value)];
	document.getElementById('accuracyDisplay').innerHTML = document.getElementById('shootingAccuracy').value + '%';
	document.getElementById('climbTime').innerHTML = document.getElementById('climbSpeedSlider').value + ' seconds';
	// Post match data
	document.getElementById('overallRatingDisplay').innerHTML = overallRatingText[parseInt(document.getElementById('overallRating').value)];
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
	
	var sandstormGears = [0,0];
	for(var i = 0; i < gear_Stack["sandstorm"].length; i++)
	{
		if(gear_Stack["sandstorm"][i] == "center")
			sandstormGears[0]++;
		else
			sandstormGears[1]++;
	}
	matchData += sandstormGears[0] + "," + sandstormGears[1] + ",";
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
	
	matchData += document.getElementById("shootingAccuracy").value + ",";
	matchData += document.getElementById("groundPickupFuel").checked + ",";

	var teleGears = [0,0];
	for(var i = 0; i < gear_Stack["teleop"].length; i++)
	{
		if(gear_Stack["teleop"][i] == "center")
			teleGears[0]++;
		else
			teleGears[1]++;
	}
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
	gear_Stack['sandstorm'] = new Array();
	document.getElementById("startingPositionBoiler").checked = false;
	document.getElementById("startingPositionCenter").checked = false;
	document.getElementById("startingPositionLoading").checked = false;
	document.getElementById("startingPositionLoading").checked = false;
	document.getElementById("startingPositionLoading").checked = false;
	document.getElementById("crossedBaseline").checked = false;
	document.getElementById("hopperPushedSandstorm").checked = false;

	// teleop data reset
	fuel_Stack['teleop'] = new Array();
	gear_Stack['teleop'] = new Array();
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
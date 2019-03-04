<?php
$db = new SQLite3('data/ScoutingDatabase.db') or die('0');
$teamNumber = _GET['teamNumber'];
$query = "SELECT AVG(exitHABSandstorm), 
SUM(CASE startingPositionLevel WHEN 'Lvl2' THEN 1 ELSE 0 END), 
AVG(hatchInCargoShipScoredSandstorm + hatchInHighRocketScoredSandstorm + hatchInLowRocketScoredSandstorm + hatchInMiddleRocketScoredSandstorm), 
AVG(cargoInCargoShipScoredSandstorm + cargoInHighRocketScoredSandstorm + cargoInLowRocketScoredSandstorm + cargoInMiddleRocketScoredSandstorm), 
AVG(hatchInCargoShipScoredTeleop + hatchInLowRocketScoredTeleop),
AVG(hatchInMiddleRocketScoredTeleop),
AVG(hatchInHighRocketScoredTeleop),
AVG(cargoInCargoShipScoredTeleop + cargoInLowRocketScoredTeleop),
AVG(cargoInMiddleRocketScoredTeleop),
AVG(cargoInHighRocketScoredTeleop),
SUM(CASE climbLevel WHEN 'Lvl1' THEN (CASE climbSuccess WHEN 1 THEN 1 ELSE 0) ELSE 0 END),
SUM(CASE climbLevel WHEN 'Lvl2' THEN (CASE climbSuccess WHEN 1 THEN 1 ELSE 0) ELSE 0 END),
SUM(CASE climbLevel WHEN 'Lvl3' THEN (CASE climbSuccess WHEN 1 THEN 1 ELSE 0) ELSE 0 END),
AVG(diedNoShow),
AVG(overallRating) 
FROM ScoutData WHERE teamNumber=" . $teamNumber;
$results = $db->query($query);
$numericData = array();
while($row = $results->fetchArray()) {
	array_push($numericData, array($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7], $row[8], $row[9], $row[10], $row[11], $row[12], $row[13], $row[14]));
}
$query = "SELECT comments FROM ScoutData WHERE teamNumber=" . $teamNumber;
$results = $db->query($query);
$comments = array();
while($row = $results->fetchArray()) {
	array_push($comments, $row[0]);
}
$return = array();
array_push($return, $numericData);
array_push($return, $comments);
echo json_encode($return);
$db->close();
?>

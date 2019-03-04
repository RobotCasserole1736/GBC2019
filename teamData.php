<?php
$db = new SQLite3('data/ScoutingDatabase.db') or die('0');
$query = "SELECT teamNumber, AVG(hatchInHighRocketScoredSandstorm), AVG(hatchInHighRocketScoredTeleop) FROM ScoutData GROUP BY teamNumber ORDER BY teamNumber ASC";
$results = $db->query($query);
$return = array();
while($row = $results->fetchArray()) {
	array_push($return, array($row[0], $row[1], $row[2]));
}
echo json_encode($return);
$db->close();
?>
